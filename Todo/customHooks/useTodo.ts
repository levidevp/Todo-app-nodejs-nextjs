import { useEffect, useState } from "react"
import axios from "axios";



//   ------------------------------------------------------------------------------------------
type todotype = {
    input: string,
    id: string,
}



//   ------------------------------------------------------------------------------------------


const useTodo = () => {
    //   ------------------------------------------------------------------------------------------

    const [input, setinput] = useState<string>('')
    const [re, setre] = useState<any>({})
    const [data, setdata] = useState<todotype[]>([])
    const [toggle, settoggle] = useState(true)
   

    //   ------------------------------------------------------------------------------------------

    useEffect(() => {
        getTodosHandler();    
    }, [])

    //   ------------------------------------------------------------------------------------------


    const save = async () => {
        if (!input) {
            alert("fill the task")
        } else {  
            try {
               await axios.post('http://localhost:8000/todosADD', { input }).then((response) => {
                console.log(response);
                    setdata([...data, response.data]);
                   
                    setinput('');
                  }); 
            }
            catch (e) {
                console.error(e);
            }
        }
        setinput("")
    }

    const getTodosHandler = async () => {
        try {
            const response = await axios.get('http://localhost:8000/todosGET');
            setdata(response.data);        
        } catch (error) {
            console.log('Error fetching todos: ', error);
        }
    }
    //   ------------------------------------------------------------------------------------------


    // to delete the todo from firebase
    const cancel = async (item: todotype) => {
        try {
            await axios.delete(`http://localhost:8000/todosDELETE?id=${item.id}`).then((response) => {
                    setdata(response.data);  
                  });
        } catch (error) {
            console.log('================catch====================');
            console.log("cancel",error);
            console.log('====================================');
        }
    }


    //   ------------------------------------------------------------------------------------------
    const update = (item: todotype) => {
        // storing id in state re and the description in input
        settoggle(false)
        setinput(item.input)
        setre(item)
    }

    //   -------------------------------------------------------------------------------------------------------

    const onEditHandler = async () => {
        try {
            await axios.put(`http://localhost:8000/todosUPDATE?id=${re.id}`,{ input }).then((response) => {
                setdata(data.map(todo => (todo.id === re.id ? response.data : todo)));
              });
            setinput("")
        } catch (error) {
            console.log('================catch====================');
            console.log(error);
            console.log('====================================');
        }finally{
            settoggle(true)
        }
    }

    //   -------------------------------------------return started----------------------------------------------

    return {
   input,
   data,
   re,
   toggle,
   setinput,
   setdata,
   setre,
   settoggle,
   cancel,
   save,
   getTodosHandler,
   update,
   onEditHandler,
    }

}
export default useTodo