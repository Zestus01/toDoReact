import {useState, useRef} from 'react'

export default function App(){
    const [page, setPage] = useState('to-do');
    const [toDoList, setToDoList] = useState([]);
    const [compList, setCompList] = useState([]);
    const [listCount, setListCount] = useState(0);
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

    const ref=useRef(null);
    return (
        <div id='taskSection' className='container'>
            {props.toDoList.map( (item, index) => 
                <div className='row d-flex justify-content-center container' 
                id={item.task + index} 
                key={item.task + index}
                > 
                    <input 
                    className={"form-check-input " + (item.isDone ? 'btn-primary' : '')  }
                    onClick={() => {item.isDone = !item.isDone 
                        setRerender(!rerender)
                    }}
                    type="checkbox" 
                    value="" 
                    id={item.task + index}/>
                        <div className={item.isDone ? "text-muted text-decoration-line-through" : '' }
                        ref={ref} 
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
                return <div key={item} id={item} 
                onClick={()=> props.setPage(item)}
                > 
                &nbsp; {item} &nbsp; 
                </div>
            })}
        </div>
    )
}