import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from 'antd';
import s from "./styles.module.css";
import { ButtonBack } from '../ButtonBack/ButtonBack';


function onChange(e) {
    console.log(e);
};

export function CreatePostForm({createNewPost}) {

    const {register, handleSubmit, formState: {errors} } = useForm({
        mode: "onBlur"
    });

    function onSubmit(data) {
        data.tags = data.tags.split(" ");
        createNewPost(data);
    }

    return (
        <div className='container'>
            <ButtonBack/>
            <form className={s.form} onSubmit={handleSubmit(onSubmit)}> 
                <h2>Let's create a new post!</h2>
                <label>Enter title:
                    <input className={s.input}
                    onChange={onChange} 
                        type="text"
                        {...register('title', {
                            required: 'This field is required'
                        })}
                        placeholder="Enter title"
                />
                </label>
                <div>
                    {errors?.title && <p className={s.errorMessage}>{errors?.title?.message}</p>}
                </div>
                <label>Enter text:
                    <textarea rows={4} className={s.input} 
                    onChange={onChange}
                        // type="textarea"
                        {...register('text', {
                            required: 'This field is required'
                        })}
                        placeholder="Enter text"
                    />
                </label>
                <div>
                    {errors?.text && <p className={s.errorMessage}>{errors?.text?.message}</p>}
                </div>
                <label>Enter image link:
                    <input className={s.input} 
                    onChange={onChange} 
                        type="text"
                        {...register('image')}
                        placeholder="Enter image link"
                    />
                </label>
                <label>Enter tags:
                    <input className={s.input} 
                    onChange={onChange} 
                        type="text"
                        {...register('tags')}
                        placeholder="Enter tags"
                    />
                </label>
                <Button type="primary" className={s.button} onClick={handleSubmit(onSubmit)}>Save</Button>
            </form>
        </div>
    )
}
