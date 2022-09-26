const { createApp } = Vue

createApp({
  data() {
    return {
      message: 'Hello Vue!',
      title:"",
      content:"",
      getTitle:"",
      getContent:"",
      data:""
    }
  },
  methods:{
    focusAdd(){
        document.querySelector(".template").classList.add('focusadd');
        document.querySelector(".template").classList.remove('focuscontent');
    },
    focusContent(){
        document.querySelector(".template").classList.remove('focusadd');
        document.querySelector(".template").classList.add('focuscontent');
    },
    clear(){
        this.title="";
        this.content="";
    },
    send(){
        axios.post("https://axios-todo-app-default-rtdb.europe-west1.firebasedatabase.app/data.json",{
            title:this.title,
            content:this.content
        })
        .then(res => {
            this.getData();
        })
    },
    getData(){
        axios.get("https://axios-todo-app-default-rtdb.europe-west1.firebasedatabase.app/data.json")
        .then(response => {
            let data=[];
            for (item in response.data) {
                data.push(response.data[item]);      
            }
            this.getTitle = data[0].title;
            this.getContent = data[0].content;
            this.data = data;
        })
    },
    select(item){
        this.getTitle = item.title;
        this.getContent = item.content;
    }
  },
  created(){
    this.getData();
  }
}).mount('#app')