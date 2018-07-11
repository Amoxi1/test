window.onload = function(){
    var todoIpt = document.getElementById("todoValue");
    var saveIpt = document.getElementById("send");
    var clearIpt = document.getElementById("clear");

    createList();

    //储存用户输入值
    function addTodo(){
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
    function createList(){
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
    var elRemove =document.getElementsByTagName('i')
    for(var i=0;i<elRemove.length;i++){
        elRemove[i].onclick = (function(n){
            return function(){
                var keys = localStorage.key(n);
                localStorage.removeItem(keys);
                location.reload();
            }
        })(i)
    }

    //修改
    var valueChange = document.getElementsByTagName("b")
    for(var i=0;i<valueChange.length;i++){
        valueChange[i].index = i;
        valueChange[i].onclick = function(){
            var num = this.index;
            var key = localStorage.key(num)
            var value = todoIpt.value
            if(!value){
                alert("修改内容不可为空")
            }else{
                localStorage.setItem(key, value)
                location.reload()
            }
            
        }
    }

    //添加待办事项
    saveIpt.onclick = function(){
        addTodo();
    }

    //回车添加事项
    todoIpt.onkeydown = function(e){
        var e = e ||window.event;
        if(e.keyCode == 13){
            addTodo();            
        }
    }
    //删除全部
    clearIpt.onclick = function(){
        localStorage.clear()
        location.reload();
    }

}
