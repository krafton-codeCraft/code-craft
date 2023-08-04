/* const stage = {
    data : null, // imageData 를 저장해 두는데 사용됨
    renderer : null, // 랜더러를 저장함.
    mouseX : 0, // 갱신되는 mouseX 값을 저장하는데 사용됨
    mouseY : 0, // 갱신되는 mouseY 값을 저장하는데 사용됨
    frame: 0, // requestAnimationFrame 이 한번 실행될때마다 ++

    sprite(){
      return new PIXI.Sprite(texture);
    },

    createParticles (_x, _y){ // 인자로 최초에 파티클을 생성할 텍스트 기준의 x, y 좌표를 받는다.
      const sprite = this.sprite(); // sprite 를 받는다.
      const scale = 0.2 + Math.random() * .2; // 파티클의 배율을 지정한다.
      const moveRadius = Math.random() * 10; // 파티클이 지속적으로 움직일 반지름의 값을 랜덤으로 지정한다.
      const tint = Math.random() * 0xE68664; // 색상을 지정한다.
      const x = canvasElement.width / 2 - this.textWidth / 2 + _x; // 캔바스를 기준으로 중심에 위치하도록 x 좌표를 구한다.
      const y = canvasElement.height / 2 - this.textHeight / 2 + _y; // 캔바스를 기준으로 중심에 위치하도록 y 좌표를 구한다.
      const speed = 5 + Math.random() * 5; // 파티클의 이동 속도를 랜덤함수를 이용해 산출 한다.
      const set = { // 지정된 값들을 저장한다.
        x,
        y,
        scale,
        moveRadius,
        tint,
        speed,
        _x,
        _y
      };

      const add = {
        moveRadius,
      };

      const move = ()  => { // 지속적으로 파티클이 움직이도록 하는 함수를 지정한다.
        const check = clashCheck(set.x, set.y, this.mouseX, this.mouseY); // 마우스와의 충돌을 체크하고
        if( check[0] ){ // 충돌했을 경우와
          add.moveRadius = Math.min ( add.moveRadius + check[1]/5, 200 );
        } else if( add.moveRadius > 0 ){ // 아닌경우를 지정.
          add.moveRadius --;
        } 
        const x = set._x + Math.cos(this.frame / set.speed) * ( set.moveRadius + add.moveRadius);
        const y = set._y + Math.sin(this.frame / set.speed) * ( set.moveRadius + add.moveRadius);
        // 변경되는 좌표를 파티클에 각각 지정
        sprite.x = canvasElement.width / 2 - this.textWidth / 2 + x;
        sprite.y = canvasElement.height / 2 - this.textHeight / 2 + y;
  
        // 변경되는 좌표를 별도 set 값에 저장함. ( 마우스와 충돌시 점점 멀어지는 효과를 구현하기 위해 )
        set.x = canvasElement.width / 2 - this.textWidth / 2 + set._x;
        set.y = canvasElement.height / 2 - this.textHeight / 2 + set._y;
      };
      // 최초 생성시 x, ym scale, tint 값을 sprite 에 지정
      sprite.x = x; 
      sprite.y = y; 
      sprite.scale.set(scale); 
      sprite.tint = tint;
  
      // 해당 값들을 객체로 리턴함.
      return {
        sprite,
        set,
        add,
        move
      };
    } // 여기까지 creatparticle
  } */