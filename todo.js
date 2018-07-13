window.onload = function(){
    var tabnav = document.querySelector(".nav");
    var alltitle = tabnav.querySelectorAll("li");
    var content = document.querySelector(".list");
    var allConent = content.querySelectorAll("ul");
    //tab切换
    for(var i=0;i<alltitle.length;i++){
        alltitle[i].index = i;
        alltitle[i].onclick = function(){
            for(var j=0;j<alltitle.length;j++){
                alltitle[j].className = '';
                allConent[j].className = 'hide';
            }
            alltitle[this.index].className = 'selected';
            allConent[this.index].className = '';
        }

    }

    var todoIpt = document.getElementById("todoValue");
    var send = document.getElementById("send");
    var clear = document.getElementById("clear");
    var todoListArray = [];
    createList();
    //储存用户输入值
    function saveValue(){
        var obj_list = {
            todo:"",  //储存输入值
            done:false   //判断事项状态
        }
        var todoValues = todoIpt.value ;
        if(!todoValues){
            alert("输入内容不可为空");
            return;
        }
        //给待办事项赋值
        obj_list.todo = todoValues;
        todoListArray.push(obj_list)
        saveData(todoListArray)
        todoValues = "";
        createList();
        todoIpt.focus();
    }

    //渲染列表
    function createList(){
        var allList = document.querySelector("#alllist");    
        var todolist = document.querySelector("#todolist");
        var donelist = document.querySelector("#donelist");
        //var allHtml = "";
        var todoHtml = "";
        var doneHtml = "";
        todoIpt.focus();
        todoListArray = loadData();
        if(todoListArray != null){
            for(var i=0;i<todoListArray.length;i++){
                if(!todoListArray[i].done){//未完成
                    todoHtml +="<li><span>内容" + todoListArray[i].todo + "</span><input type='text' /><b>修改</b><i>删除</i><p class='finished' onclick=''>完成</p></li>"
                }else{
                    doneHtml +="<li><span>内容" + todoListArray[i].todo + "</span><input type='text' /><b>修改</b><i>删除</i></li>"
                }
            }
            todolist.innerHTML = todoHtml
            donelist.innerHTML = doneHtml
            allList.innerHTML = todoHtml + doneHtml
        }else{
            allList.innerHTML = "";
            todolist.innerHTML =  "";
            donelist.innerHTML = "";
        }
    
    }

    function saveData(data) {
        localStorage.setItem("mytodo", JSON.stringify(data));   //JS对象转换成JSON对象存进本地缓存
    }
    function loadData() {
        var hisTory = localStorage.getItem("mytodo");
        if(hisTory !=null){
            return JSON.parse(hisTory);     //JSON对象转换为JS对象
        }else { 
            return [];
        }
    }
    //点击完成修改状态
    var statusChange = document.querySelector
    

    //添加待办事项
    send.onclick = function(){
        saveValue();
    }

    //回车添加事项
    todoIpt.onkeydown = function(e){
        var e = e ||window.event;
        if(e.keyCode == 13){
            saveValue();      
        }

    }

    //删除全部
    clear.onclick = function(){
        localStorage.clear()
        location.reload();
    }
}