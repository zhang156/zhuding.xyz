<template>
  <div id="background">
    <canvas class="background" ref="background"></canvas>
  </div>
</template>

<script>
/* eslint-disable */
var window = window || global;

export default {
  name: 'background',
  props: {
    width: [Number, String],
    height: [Number, String]
  },
  watch: {
    width (nv, ov) {
      this.$nextTick(() => {
        this.initHeader()
        this.initAnimation()
        this.addListeners()
      })
    }
  },
  data () {
    return {
      target: '',
      canvas: '',
      ctx: '',
      points: [],
      animateHeader: true
    }
  },
  mounted () {
    
  },
  methods: {
    initHeader() {
      this.target = {x: this.width/2, y: this.height/2}

      this.canvas = this.$refs.background
      this.canvas.width = this.width
      this.canvas.height = this.height
      this.ctx = this.canvas.getContext('2d')

      // create points
      this.points = []
      for(var x = 0; x < this.width; x = x + this.width/20) {
        for(var y = 0; y < this.height; y = y + this.height/20) {
          var px = x + Math.random()*this.width/20
          var py = y + Math.random()*this.height/20
          var p = {x: px, originX: px, y: py, originY: py }
          this.points.push(p)
        }
      }

      // for each point find the 5 closest points
      for(var i = 0; i < this.points.length; i++) {
        var closest = []
        var p1 = this.points[i]
        for(var j = 0; j < this.points.length; j++) {
          var p2 = this.points[j]
          if(!(p1 == p2)) {
            var placed = false
            for(var k = 0; k < 5; k++) {
              if(!placed) {
                if(closest[k] == undefined) {
                  closest[k] = p2
                  placed = true
                }
              }
            }

            for(var k = 0; k < 5; k++) {
              if(!placed) {
                if(this.getDistance(p1, p2) < this.getDistance(p1, closest[k])) {
                  closest[k] = p2
                  placed = true
                }
              }
            }
          }
        }
        this.$set(p1, 'closest', closest)
      }

      // assign a circle to each point
      for(var i in this.points) {
        var c = this.Circle(this.points[i], 2+Math.random()*2, 'rgba(255,255,255,0.3)')
        this.$set(this.points[i], 'circle', c)
      }
    },
    addListeners() {
      if(!('ontouchstart' in window)) {
        this.$refs.background.addEventListener('mousemove', this.mouseMove)
      }
      window.addEventListener('scroll', this.scrollCheck)
    },
    mouseMove(e) {
      var posx = 0,
          posy = 0;
      this.target.x = e.offsetX
      this.target.y = e.offsetY
    },
    scrollCheck() {
      if(window.document.body.scrollTop > this.height) {
        this.animateHeader = false
      } else {
        this.animateHeader = true
      }
    },
    initAnimation() {
      this.animate()
      for(var i in this.points) {
        this.shiftPoint(this.points[i])
      }
    },
    animate() {
      if(this.animateHeader) {
        this.ctx.clearRect(0,0,this.width,this.height)
        for(var i in this.points) {
          // detect points in range
          if(Math.abs(this.getDistance(this.target, this.points[i])) < 4000) {
            this.$set(this.points[i], 'active', 0.3)
            this.$set(this.points[i].circle, 'active', 0.6)
          } else if(Math.abs(this.getDistance(this.target, this.points[i])) < 20000) {
            this.$set(this.points[i], 'active', 0.1)
            this.$set(this.points[i].circle, 'active', 0.3)
          } else if(Math.abs(this.getDistance(this.target, this.points[i])) < 40000) {
            this.$set(this.points[i], 'active', 0.02)
            this.$set(this.points[i].circle, 'active', 0.1)
          } else {
            this.$set(this.points[i], 'active', 0)
            this.$set(this.points[i].circle, 'active', 0)
          }

          this.drawLines(this.points[i])
          // this.points[i].circle.draw()
          this.drawCircle(this.points[i])
        }
      }
      requestAnimationFrame(this.animate)
    },
    drawCircle (p) {
      this.ctx.beginPath()
      this.ctx.moveTo(p.x, p.y)
      this.ctx.arc(p.x, p.y, 2+Math.random()*2, 0, 2 * Math.PI, false)
      this.ctx.fillStyle = 'rgba(128,128,128,'+ p.active +')'
      this.ctx.fill()
    },
    drawLines(p) {
      if(!p.active) return
      for(var i in p.closest) {
        this.ctx.beginPath()
        this.ctx.moveTo(p.x, p.y)
        this.ctx.lineTo(p.closest[i].x, p.closest[i].y)
        this.ctx.strokeStyle = 'rgba(128,128,128,'+ p.active+')'
        this.ctx.stroke()
      }
    },
    getDistance(p1, p2) {
      return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2)
    },
    shiftPoint(p) {
      /* , ease:Circ.easeInOut */
      TweenLite.to(p, 1+1*Math.random(), {x:p.originX-50+Math.random()*100,
          y: p.originY-50+Math.random()*100,
          onComplete: () => {
            this.shiftPoint(p);
          }});
    },
    Circle(pos,rad,color) {
      var circle = function (pos,rad,color) {
        var _this = this;
        _this.pos = pos || null;
        _this.radius = rad || null;
        _this.color = color || null;
        _this.active = 0

        this.draw = function() {
          if (_this.active) {
            return
          }

          var canvas = document.querySelector('.background')
          var ctx = canvas.getContext('2d')
          ctx.beginPath();
          ctx.arc(_this.pos.x, _this.pos.y, _this.radius, 0, 2 * Math.PI, false);
          ctx.fillStyle = 'rgba(156,217,249,'+ _this.active+')';
          ctx.fill();
        }
      }

      return new circle(pos,rad,color)

      /* var _this = this
      var canvas = document.querySelector('.background')
      var ctx = canvas.getContext('2d')
      return {
        pos: pos,
        radius: rad,
        color: color,
        active: 1,
        draw: function() {
          if (this.active) {
            return
          }
          // console.log(this.pos.x,this.pos.y, this.radius)
          ctx.beginPath()
          ctx.moveTo(this.pos.x,this.pos.y)
          ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, false)
          ctx.fillStyle = 'rgba(156,217,249,'+ this.active+')'
          ctx.fill()
        }
      } */
    }
  }
}
</script>

<style lang="scss" scoped>
  #background {
    width: 100%;
    height: 100%;
    background: #eeeeee;
    position: fixed;
    z-index: 0;
  }
</style>


