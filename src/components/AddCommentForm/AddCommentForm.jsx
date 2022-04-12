import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from 'antd';
import s from "./styles.module.css";


function onChange(e) {
    console.log(e);
};

export function AddCommentForm({createPostComment, id}) {

    const {register, handleSubmit, formState: {errors} } = useForm({
        mode: "onBlur"
    });

    function onSubmit(data) {
        createPostComment(data, id);
    }

    return (
        <div className='container'>
            <form className={s.form} onSubmit={handleSubmit(onSubmit)}> 
                <h2>Comment this post!</h2>
                <label>Add your comment:
                    <textarea rows={4} className={s.input}
                        onChange={onChange} 
                        type="text"
                        {...register('text')}
                        placeholder="Enter comment"
                    />
                </label>
                <Button type="primary" className={s.button} onClick={handleSubmit(onSubmit)}>Save</Button>
            </form>
        </div>
    )
}
