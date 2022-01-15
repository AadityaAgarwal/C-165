AFRAME.registerComponent('enemybullet',{
    init:function(){setInterval(this.shootEnemyBullet,2000)},

    shootEnemyBullet:function(){
        var tankEl=document.querySelectorAll('.enemy')

        for(i=0;i<tankEl.length;i++){
            BulletEl=document.createElement('a-entity')
            BulletEl.setAttribute('geometry',{primitive:'sphere',radius:0.1})
            BulletEl.setAttribute('material',{color:'black'})

            tankPosition=tankEl[i].getAttribute('position')

            BulletEl.setAttribute('position',{x:tankPosition.x+1.5,y:tankPosition.y+3.5,z:tankPosition.z})
            sceneEl=document.querySelector('#scene')
            sceneEl.appendChild(BulletEl)

            enemy=tankEl[i].object3D;
            player=document.querySelector('#weapon').object3D;

            pos1=new THREE.Vector3();
            pos2=new THREE.Vector3();

            enemy.getWorldPosition(pos2)
            player.getWorldPosition(pos1)

            direction=new THREE.Vector3()
            direction.subVectors(pos1,pos2).normalize();

            BulletEl.setAttribute('velocity',direction.multiplyScalar(10))
            BulletEl.setAttribute('dynamic-body',{shape:'sphere',mass:0})

            var lifeCounter=document.querySelector('#countLife')
            playerLife=parseInt(lifeCounter.getAttribute('text').value)
            console.log(playerLife)
            
            BulletEl.addEventListener('collide',function (e){
                if(e.detail.body.el.id=='weapon'){
                    if(playerLife>0){
                        playerLife--
                        lifeCounter.setAttribute('text',{value:playerLife})
                    }
                    if(playerLife<=0){
                        gameOver=document.getAttribute('#over')
                        gameOver.setAttribute('visible',true)
                        tank=document.querySelectorAll('.enemy')
                        for(i=0;i<tank.length;i++){
                            sceneEl.removeChild(tank[i])
                        }
                    }
                }
            })
        }
    },
})