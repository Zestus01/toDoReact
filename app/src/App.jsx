import {useState, useRef, useEffect} from 'react'

export default function App(){
    const [page, setPage] = useState('To-Do');
    const [toDoList, setToDoList] = useState([]);
    const [compList, setCompList] = useState([]);
    const [listCount, setListCount] = useState(0);
    // let listObj = window.localStorage.getItem('toDoList');
    // let count = 0;
    // useEffect( () => {
    //     if(listObj){
    //         listObj = JSON.parse(listObj);
    //         count = listObj.length ;
    //         setListCount(listObj.length)
    //     }
    // }, [])
    
    return(
        <div className='text-center justify-content-center'>
            <InputBox  
            list={toDoList} 
            setListCount={setListCount} 
            listCount={listCount} 
            setToDoList={setToDoList}
            />
            <ListItems 
            listCount={listCount} 
            toDoList={toDoList} 
            setListCount={setListCount} 
            setCompList={setCompList} 
            compList={compList} 
            page={page}
            count={listCount}
            />
            <Footer 
            setPage={setPage} 
            listCount={listCount}
            page={page}
            />
        </div>
    )
}

function InputBox(props){

    const ref=useRef(null);

    function handleEnter(e){
        if(e.key === 'Enter'){
            let boxValue = ref.current.value;
            if(boxValue === ''){
                return;
            }
            let taskObj = {isDone: false, task: boxValue}
            props.setToDoList([...props.list, taskObj]);
            window.localStorage.setItem('toDoList', JSON.stringify(props.list));
            props.setListCount(props.listCount + 1);
            ref.current.value = '';
        }
    }
    return  (
        <>
            <input ref={ref} 
            id='input' 
            type='text' 
            placeholder='TO DO NEVA' 
            onKeyDown={handleEnter}/>
        </>
    )
}

function ListItems(props){
    const [rerender, setRerender] = useState(true);
    let tasks = props.toDoList;
    if(props.page !== 'All'){
        let filterVar = props.page === 'Completed' ? true : false;
        tasks = props.toDoList.filter((item) => item.isDone === filterVar);
    }
    return (
        <div id='taskSection' className='container'>
            {tasks.map( (item, index) => 
                <div className='row d-flex justify-content-center container' 
                id={item.task + index} 
                key={item.task + index}
                > 
                    <input 
                    className="form-check-input" 
                    onClick={() => {item.isDone = !item.isDone 
                        setRerender(!rerender)
                    }}
                    type="checkbox" 
                    defaultChecked={item.isDone ? true : false} 
                    id={item.task + index}
                    />
                        <div className={item.isDone ? "text-muted text-decoration-line-through" : '' }
                        id={item.task + index + 'T'}
                        >
                            {item.task}
                        </div>
                </div> )}
        </div>
    )
}

function Footer(props){
    let sections = ['To-Do', 'Completed', 'All']
    return(
        <div className='container-fluid d-flex justify-content-center text-muted'>
            <p> &nbsp; {props.listCount} &nbsp; </p>
            {sections.map( (item) => { 
                return (
                <div 
                key={item}
                id={item} 
                className={item === props.page ? 'fw-bold' : ''}  
                onClick={()=> props.setPage(item)}
                > 
                &nbsp; {item} &nbsp; 
                </div>
                )})}
        </div>
    )
}