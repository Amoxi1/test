window.onload = function(){
    var todoIpt = document.getElementById("todoValue");
    var saveIpt = document.getElementById("send");
    var clearIpt = document.getElementById("clear");

    CreateList();

    //储存用户输入值
    function addtodo(){
        var todoValue = todoIpt.value ;
        if(!todoValue){
            alert("输入不可为空")
        }else{
            var time = new Date().getTime()
            localStorage.setItem(time,todoValue);
            todoValue.value = '';
            location.reload();
        }
        
    }
    //渲染待办事项列表
    function CreateList(){
        var todoList = document.getElementsByClassName("todolist")[0];
        todoList.innerHTML = '' ;
        for(var i=0;i<localStorage.length;i++){
            var addLi = document.createElement('li');
            var items = localStorage.key(i);
            var Values = localStorage.getItem(items);
            addLi.innerHTML = "<span>内容" + Values + "</span><i>删除</i><b>修改</b>"
            todoList.appendChild(addLi)
            todoIpt.focus();
        }

    }
    //删除单个
    var oI =document.getElementsByTagName('i')
    for(var i=0;i<oI.length;i++){
        oI[i].onclick = (function(n){
            return function(){
                var keys = localStorage.key(n);
                localStorage.removeItem(keys);
                location.reload();
            }
        })(i)
    }

    //修改
    var oB = document.getElementsByTagName("b")
    for(var i=0;i<oB.length;i++){
        oB[i].onclick = function(){
            
        }
    }


    saveIpt.onclick = function(){
        addtodo();
    }
    clearIpt.onclick = function(){
        localStorage.clear()
        location.reload();
    }

}
