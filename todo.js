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

    var todoIpt = document.querySelector("#todoValue");
    var send = document.querySelector("#send");
    var clear = document.querySelector("#clear");
    var todoListArray = [];
    var obj_list = {
        todo:"",  //储存输入值
        done:false   //判断事项状态
    }
    createList();
    //储存用户输入值
    function saveValue(){
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
                    todoHtml +="<li><span>内容" + todoListArray[i].todo + "</span><b onclick='edit("+i+")'>修改</b><i class='delete' onclick='remove("+i+")'>删除</i><p class='status' onclick='changeStatus("+i+", \"done\", true)'>待完成</p></li>"
                }else{
                    doneHtml +="<li><span>内容" + todoListArray[i].todo + "</span><b>修改</b><i class='delete' onclick='remove("+i+")'>删除</i><p class='status'>已完成</p></li>"
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
    //添加待办事项
    send.addEventListener("click",function(){
        saveValue();
    },false)

    //回车添加事项
    todoIpt.addEventListener("keydown",function(e){
        var e = e ||window.event;
        if(e.keyCode == 13){
            saveValue();      
        }
    },false)

    //删除单个事项
    function remove(i) {
        todoListArray.splice(i, 1);
        saveData(todoListArray);
        createList();
    }
    //修改事项状态
    function changeStatus(i, done, value) {  
        todoListArray[i][done] = value; 
        console.log(todoListArray)
        console.log("i",i)
        console.log('done',done)
        console.log('value',value)
        saveData(todoListArray);  
        createList();
    }
    //编辑内容
    function edit(i){
        if(!todoIpt.value){
            alert("修改内容不可为空")
        }else{
            changeStatus(i,"todo",todoIpt.value)
        }
    }
    
    //删除全部
    clear.addEventListener("click",function(){
        localStorage.clear()
        location.reload();
    },false)
