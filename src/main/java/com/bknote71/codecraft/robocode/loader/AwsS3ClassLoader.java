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
import java.util.concurrent.TimeUnit;


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
}
