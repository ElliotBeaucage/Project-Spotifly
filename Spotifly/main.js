import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'


createApp({
    data()
    {
      return{
        chansons: [],
        songs: [],
        music: null,
        img: null,
        tempsSec: 0,
        titre: null,
        artiste: null,
        pageActive: "accueil",
        filtre: "",
        
        
      
        }
      
    }
       
    ,
  methods: {
    info(song)
    {
      this.music = song.audio
      this.img = song.image
      this.titre = song.titre
      this.artiste = song.artiste
      let volume = document.querySelector(".volume-control")
      volume.style.display = "block"
      let lecteur = document.querySelector(".lecteur")
      lecteur.style.display = "block"
      let play = document.querySelector('#play')
      play.style.display = "block"
      pause.style.display ="none"
      this.tags = song.tags
      
    }
    ,
    volume()
    {

      let volumeControl = document.getElementById('volume');
      let audio = document.getElementById("audio")
      volumeControl.value = this.$refs.audio.volume = 0.5;
      volumeControl.addEventListener('change', function(e) {
          audio.volume = e.currentTarget.value 
      });
      
    }
    ,
    play() {
      this.$refs.audio.play()
      play.style.display = "none"
      pause.style.display ="block"
        
    },
    pause()
    {
        this.$refs.audio.pause()
        play.style.display = "block"
        pause.style.display = "none"
    },
    ended()
    {
      
      audio.onended = function(){
        play.style.display = "block"
        pause.style.display = "none"
      }

    },
    update() 
    {
        this.tempsSec = this.$refs.audio.currentTime 
        
    },
    formatTime(tempsSec) {
      let minutes = (Math.floor(tempsSec / 60) +"").padStart(2,"0")
      let secondes = (Math.floor(tempsSec - minutes * 60) + "").padStart(2, "0")
      return minutes + ":" + secondes
      
    },
    changerPage(nomDeLaPage) {
      this.pageActive = nomDeLaPage  
      let lecteur = document.querySelector(".lecteur")
      if(this.pageActive == "accueil")
      {
        lecteur.style.display = "none"
        this.pause()
      }
    }
    ,
    filtreChanson(chanson)
    {

      let search = this.filtre.toLowerCase()
      let titre = chanson.titre.toLowerCase().indexOf(search)
      let artiste = chanson.artiste.toLowerCase().indexOf(search)
    
    
    
      if(search === "")
      {
        return true
      }
      if(titre >= 0)
      {
       return true
      }
      else if(artiste >= 0)
      {
        return true
      }
    }
    ,
    progressBar()
    {
      let audio = document.querySelector('#audio');
      let progressBar = document.querySelector('.progress-bar');

      audio.addEventListener('timeupdate', () => {
          if (audio.currentTime && audio.duration) {
              let progress = (audio.currentTime / audio.duration) * 100;
              progressBar.style.width = progress + '%';
          }
      });

      audio.addEventListener('ended', () => {
        progressBar.style.width = '0%';
    });
    }
    }
    ,
    mounted()
    {
      fetch("data/chansons.json").then(resultat => {
      resultat.json().then(listchansons => {
        this.chansons = listchansons
        
        })
      })

      this.volume()
      this.ended()
      this.progressBar()
      
      
      
      
    }
})
.mount("#app")