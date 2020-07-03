
const list = document.querySelector(".list");
let output = '';    
/* function addBookmark(e){
    e.preventDefault();
    if(localStorage.getItem('bookmarks')==null){
        let bookmarks = [];
        bookmarks.push({'site':site.value,'url':url.value});
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks))
    }
    else{
        bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        bookmarks.push({'site':site.value,'url':url.value});
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    }

    site.value = '';
    url.value = '';
    let output= '';
    bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    bookmarks.forEach(bookmark => {
        output += `
        <div class="list-item">
            <h4>${bookmark.site}</h4>          
            <a href="${bookmark.url}" class="link" target ="_blank">visit</a>           
            <a class="del">delete</a>
</div>
        ` 
        list.innerHTML = output;

    });
}
document.addEventListener('DOMContentLoaded',()=>{
    output = '';
    bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    bookmarks.forEach(bookmark => {
        output += `
        <div class="list-item">
            <h4>${bookmark.site}</h4>          
            <a href="${bookmark.url}" class="link" target ="_blank">visit</a>           
            <a class="del">delete</a>
</div>
        ` 
        list.innerHTML = output;

    });
})
list.addEventListener('click',delBookmark);

function delBookmark(e){
    if(e.target.classList.contains('del')){
        e.target.parentElement.remove();
    }
    bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    bookmarks.forEach((bookmark,index)=>{
        if(bookmark.site == e.target.previousElementSibling.previousElementSibling.innerHTML){
                    bookmarks.splice(index, 1);
                }
            localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        
    })
} */

class Bookmark{
    constructor(site,url){
        this.site = site;
        this.url = url
    }
}

class UI{
    static displayBookmarks(){
        let bookmarks = Store.getBookmarks();
        
        bookmarks.forEach(bookmark => {
        UI.addBookmark(bookmark)
    });
    }
    static addBookmark(bookmark){
    
        output += `
        <div class="list-item">
            <h4>${bookmark.site}</h4>          
            <a href="${bookmark.url}" class="link" target ="_blank">visit</a>           
            <a class="del">delete</a>
</div>
        ` 
        list.innerHTML = output;

    }
    static delBookmark(el){
        if(el.classList.contains("del")){
            el.parentElement.remove();
        }
    }
    static clearFields(){
        document.querySelector("#name").value = "";
        document.querySelector("#url").value="";

    }
    //complete alert
    static showAlert(msg,status){

    }
}
class Store{
    static getBookmarks(){
        let bookmarks;
        if(localStorage.getItem('bookmarks')==null){
            bookmarks = [];
        }
        else{
            bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        }
        return bookmarks
    }
    static addBookmark(bookmark){
        let bookmarks = Store.getBookmarks();
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    }
    static delBookmark(el){
        let bookmarks = Store.getBookmarks();
        bookmarks.forEach((bookmark,index)=>{
            if(bookmark.site == el.previousElementSibling.previousElementSibling.innerHTML){
                bookmarks.splice(index,1)
            }
        })
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
}
//Events
document.addEventListener('DOMContentLoaded',UI.displayBookmarks);

document.querySelector(".btn").addEventListener('click',(e)=>{
    e.preventDefault();
    let site = document.querySelector("#name").value;
    let url = document.querySelector("#url").value;
    

    if(site=='' || url == ''){
        UI.showAlert("Enter a valid name or url","failure");
    }
    else{
        let bookmark = new Bookmark(site,url);
        UI.addBookmark(bookmark);
        Store.addBookmark(bookmark);
    }
    UI.clearFields();
    UI.showAlert('Bookmark added successfully',"success");
});


list.addEventListener('click',(e)=>{
    UI.delBookmark(e.target);
    Store.delBookmark(e.target);
})