package com.bknote71.codecraft.robocode.loader;

import com.amazonaws.auth.ClasspathPropertiesFileCredentialsProvider;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.Region;
import com.bknote71.codecraft.web.dto.CompileResult;

import java.io.*;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Arrays;
import java.util.Properties;


public class AwsS3ClassLoader extends ClassLoader {

    public static final AwsS3ClassLoader Instance = new AwsS3ClassLoader("robot-class");

    private static final String S3_URL = "https://s3.amazonaws.com/";


    private static String packagePath;
    private static String importPath;
    private static String filePath;
    private static String outputPath;
    private static String eventPath;
    private static String[] delegatedNames;

    static {
        try (InputStream input = AwsS3ClassLoader.class.getClassLoader().getResourceAsStream("config.properties")) {
            Properties prop = new Properties();

            if (input == null) {
                System.out.println("Sorry, unable to find config.properties");
            }

            //load a properties file from class path
            prop.load(input);

            // get the property value
            packagePath = prop.getProperty("path.package");
            importPath = prop.getProperty("path.import");
            filePath = prop.getProperty("path.file");
            outputPath = prop.getProperty("path.output");
            eventPath = prop.getProperty("path.event");
            delegatedNames = prop.getProperty("path.delegate").split(",");
        } catch (IOException ex) {
            ex.printStackTrace();
        }
    }

    // amazon s3
    private AmazonS3Client s3;
    private String bucketName;

    public AwsS3ClassLoader(String bucketName) {
        this.bucketName = bucketName;
        s3 = new AmazonS3Client(new ClasspathPropertiesFileCredentialsProvider("credentials.properties"));
        s3.setRegion(Region.AP_Seoul.toAWSRegion());
    }

    public String getBucketName() {
        return bucketName;
    }

    @Override
    public URL getResource(String name) {
        try {
            return new URL(S3_URL + bucketName + "/" + name);
        } catch (MalformedURLException e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public InputStream getResourceAsStream(String key) {
        return s3.getObject(bucketName, key).getObjectContent();
    }

    @Override
    public Class<?> loadClass(String name) throws ClassNotFoundException {
        try {
            return super.loadClass(name);
        } catch (ClassNotFoundException e) {
            System.out.println("load class 하지 못했으므로 find class 호출");
            return findClass(name);
        }
    }

    @Override
    protected Class<?> findClass(String name) { // sa/FireBot.class
        try {
            if (Arrays.stream(delegatedNames).anyMatch(name::startsWith))
//                return Class.forName(name);
                return AwsS3ClassLoader.class.getClassLoader().loadClass(name);
        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        }
        System.out.println("find class: " + name);
        try {
            Class<?> result;
            byte[] classBytes = getClassBytes(name);
            String[] authorAndClass = name.split("/");
            if (authorAndClass.length < 2) {
                System.out.println("유저가 만들지 않은 로봇임");
                return null;
            }
            String robotClass = authorAndClass[1];
            String classname = robotClass.split("\\.")[0];
            String fullPath = packagePath + "." + classname;

            if ((result = findLoadedClass(fullPath)) != null) {
                System.out.println("이미 로드된 클래스입니다.");
                return result;
            }

            return defineClass(fullPath, classBytes, 0, classBytes.length);
        } catch (Throwable e) {
            System.out.println(e);
            e.printStackTrace();
        }
        return null;
    }

    private byte[] getClassBytes(String key) {
        try {
            System.out.println("key: " + key);
            long contentLength = s3.getObjectMetadata(bucketName, key).getContentLength();
            if (contentLength == 0) {
                System.out.println("컨텐츠를 s3로부터 불러오지 못함");
            }
            byte[] bytes = new byte[(int) contentLength];
            getResourceAsStream(key).read(bytes);
            return bytes;
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }

    public CompileResult createRobot(String author, String code) {
        // 클래스 이름 파싱
        String[] lines = code.split("\n");

        int startIndex = 0;
        for (int idx = 0; idx < lines.length; ++idx) {
            if (lines[idx] != null && !(lines[idx].isEmpty() || lines[idx].isBlank())) {
                startIndex = idx;
                break;
            }
        }

        if (startIndex == lines.length)
            return new CompileResult(-2, "빈 코드입니다.");

        String javaName = "";
        String startLine = lines[startIndex];
        String[] startWords = startLine.split(" ");

        if (startWords.length == 0)
            return new CompileResult(-3, "있을 수 없는일인데..");

        if (startWords[0].equals("public"))
            javaName = startWords[2];
        else if (startWords[0].equals("class"))
            javaName = startWords[1];

        if (javaName == null || javaName.isEmpty() || javaName.isBlank()) {
            System.out.println("class name 이 없습니다.");
            return new CompileResult(-4, "class name 이 없습니다.");
        }

        // 완성된 .class
        String realContent = "package " + packagePath + ";\n" +
                importPath + "\n" +
                "import com.bknote71.codecraft.robocode.event.*;" +
                code + "\n";

        // compile: {javaName}.java 파일 to {javaName}.class 파일
        CompileResult result = null;
        if ((result = compileRobot(author, javaName, realContent)).exitCode != 0) {
            System.out.println(result.content);
            return result;
        }

        // upload to s3: author/{javaName}.class 로 업로드
        String key = author + "/" + javaName + ".class";
        File file = new File(outputPath + key);
        uploadFileToS3(key, file);

        // remove file
        removeDir(outputPath + author);

        return result;
    }

    // 다른 process 를 실행하여 컴파일하도록 한다. (블로킹 작업 필수)
    private CompileResult compileRobot(String author, String javaName, String code) {
        String javaFileName = javaName + ".java";
        String javaClassName = javaName + ".class";
        try (FileWriter writer = new FileWriter(filePath + javaFileName)) {
            // 1. 파일 쓰기 작업
            writer.write(code);
            writer.flush();
            writer.close();

            // 2. javac 로 컴파일
            String javaPath = "src/main/java";
            String libPath = "lib/*";
            String outputDir = outputPath + author;
            String sourceFile = filePath + javaFileName;

            String[] cmd = new String[] {
                    "javac",
                    "-cp",
                    String.format("%s:%s", javaPath, libPath),
                    "-d",
                    outputDir,
                    sourceFile
            };

            System.out.println("cmd: " + Arrays.toString(cmd));

            ProcessBuilder processBuilder = new ProcessBuilder(cmd);
            Process process = processBuilder.start();
            int exitCode;
            if ((exitCode = process.waitFor()) != 0) {
                InputStream error = process.getErrorStream();
                return new CompileResult(exitCode, new String(error.readAllBytes()));
            }

            String[] copyCmd = new String[] {
                    "cp",
                    "-f",
                    String.format("%s/%s/%s", outputDir, packagePath.replace(".", "/"), javaClassName),
                    outputDir
            };

            ProcessBuilder copyProcessBuilder = new ProcessBuilder(copyCmd);
            Process copyProcess = copyProcessBuilder.start();
            if ((exitCode = copyProcess.waitFor()) != 0) {
                InputStream error = process.getErrorStream();
                return new CompileResult(exitCode, new String(error.readAllBytes()));
            }

        } catch (IOException e) {
            e.printStackTrace();
            return new CompileResult(-1, e.toString());
        } catch (InterruptedException e) {
            e.printStackTrace();
            return new CompileResult(-1, e.toString());
        }

        return new CompileResult(0, "success", javaName, javaClassName, code);
    }

    private void uploadFileToS3(String key, File file) {
        PutObjectRequest request = new PutObjectRequest(bucketName, key, file);
        s3.putObject(request);
    }

    private void removeDir(String path) {
        try {
            String[] removeCmd = new String[] {
                    "rm",
                    "-rf",
                    path
            };

            ProcessBuilder copyProcessBuilder = new ProcessBuilder(removeCmd);
            Process removeProcess = copyProcessBuilder.start();
            if (removeProcess.waitFor() != 0) {
                System.out.println("remove 파일 실패");
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
    }
}
