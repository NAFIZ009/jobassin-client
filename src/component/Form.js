import React, { useState } from 'react';
import '../loadercss.css';



const Form = () => {
    const [clicked,setClicked]=useState(false);
    const [error,setError]=useState("");
    const onSubmit =e=>{
        e.preventDefault();
        setError("");
        const file=e.target.jsonFile.files[0];
        file&&setClicked(true);
        const formData=new FormData();
        formData.append('file',file);
        fetch('http://localhost:5000/data',{
            method: 'POST',
            body: formData
        })
        .then(res=>{
            return res.json();
        })
        .then(data=>{
            if(!data.error){
                e.target.reset();
                setClicked(false);
            }
            else{
                setClicked(false);
                setError(data.error);
            }
        });
    };
    return (
        <div className='text-white'>
            <div className='card glass p-10 shadow'>
                <h1 className='text-4xl font-bold text-center'>Upload Data</h1>
                <div className='mt-10'>
                    <form className='flex flex-col gap-6 item-start' onSubmit={onSubmit}>
                        <label htmlFor="file" className='text-xl'>Upload Your Json File.(it will just accept json type file)</label>
                        <input type="file" name='jsonFile' id='file' accept='.json' />
                        <input type="submit" value="Submit" className={`btn btn-primary ${clicked&&'hidden'}`} />
                        {
                            !error&&clicked&&<div className="lds-dual-ring"></div>
                        }
                        {
                            error&&<div className="text-error font-bold text-lg">{error}</div>
                        }
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Form;