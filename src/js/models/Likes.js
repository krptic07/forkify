export default class Likes{
    constructor(){
        this.likes = []
    }
    addLike(id,img,title,author){
        const like = { id,img,title,author }
        this.likes.push(like);
        this.persistData();
        return like;
    }
    deleteLike(id){
        const index = this.likes.findIndex(el => el.id === id)
        this.likes.splice(index,1);
        this.persistData();
    }
    isLiked(id){
        const el = this.likes.findIndex(el => el.id === id)
        return el !== -1;
    }
    getNumOfLikes(){
        return this.likes.length;
    }
    persistData(){
        localStorage.setItem('likes',JSON.stringify(this.likes));
    }
    renderData(){
        const data = JSON.parse(localStorage.getItem('likes'));
        if (data) this.likes = data;
    }
}