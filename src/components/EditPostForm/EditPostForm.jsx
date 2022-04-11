import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from 'antd';
import s from "./styles.module.css";
import { ButtonBack } from '../ButtonBack/ButtonBack';


function onChange(e) {
    console.log(e);
};

export function EditPostForm({editPostData, editPost, id}) {

    const {register, handleSubmit, formState: {errors} } = useForm({
        mode: "onBlur"
    });

    function onSubmit(data) {
        let editData={};
        let keys = Object.keys(data);
        keys.forEach(key => {
            if(data[key] !== "") {
                if(key == "tags") {
                    editData[key] = data[key].split(" ");
                } else {
                    editData[key] = data[key];
                }
            }
        })

        editPost(editData, id);
    }

    return (
        <div className='container'>
            <ButtonBack/>
            <form className={s.form} onSubmit={handleSubmit(onSubmit)}> 
                <h2>Let's edit this post!</h2>
                <label>Enter new title:
                    <input className={s.input}
                        onChange={onChange} 
                        type="text"
                        {...register('title')}
                        placeholder="Enter title"
                        defaultValue={editPostData?.title}
                    />
                </label>
                <label>Enter new text:
                    <textarea rows={4} className={s.input} 
                        onChange={onChange}
                        {...register('text')}
                        placeholder="Enter text"
                        defaultValue={editPostData?.text}
                    />
                </label>
                <label>Enter new image link:
                    <input className={s.input} 
                        onChange={onChange} 
                        type="text"
                        {...register('image')}
                        placeholder="Enter image link"
                        defaultValue={editPostData?.image}
                    />
                </label>
                <label>Enter new tags:
                    <input className={s.input} 
                        onChange={onChange} 
                        type="text"
                        {...register('tags')}
                        placeholder="Enter tags"
                        defaultValue={editPostData?.tags.join(" ")}
                    />
                </label>
                <Button type="primary" className={s.button} onClick={handleSubmit(onSubmit)}>Save</Button>
            </form>
        </div>
    )
}
