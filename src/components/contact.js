import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios'

const appUrl = process.env.REACT_APP_URL;

const Contact = () => {
    const [helperText, setHelperText] = useState('');
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = (data) => {

        console.log(data.email);
        console.log(data.comments);

        const fetchData = async () => {
            try {
                const email = data.email;
                const comments = data.comments;
                const res = await axios.post(`${appUrl}/service/createsubscriber`, { email, comments });
                console.log("Message send successfully::" + res.data.success);
                if (res.data.success) {
                    setHelperText("Message send successfully!");
                    window.location.reload(true);
                }
                else {
                    const failMessage = res.data.fail;
                    setHelperText(failMessage);
                }
            } catch (e) {
                console.log(e);
                setHelperText(e.response.data.fail);
            }
        }
        fetchData();
    };
    console.log(errors);
      return (
          <div id="App">
              <div className='contactSection'>
                  <div className='row'>
                  <form className='contactForm' onSubmit={handleSubmit(onSubmit)}>
                        <div className='row header'>
                        <div className="contactheader">Feedback or a question ? please send me a message here !</div>
                        </div>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder='email'
                            {...register("email", {
                                required: true,
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                    message: "Please enter a valid email !"
                                }
                            })}
                        />
                        <span className="emailValidationText">
                            {errors.email && errors.email.type === "required" && <span>Email is required !</span>}
                            {errors.email && <span>{errors.email.message}</span>}
                        </span>
                        <textarea
                        id="comments"
                        name="comments"
                        type="textarea"
                        placeholder='comments'
                        {...register("comments", {
                            required: true,
                            minLength: {
                                value: 30,
                                message: "Minimum length of 30 letters"
                            },
                            pattern: {
                                value:  /^[a-z0-9\s"?!,\-.@&]+$/i,
                                message: "Allows characters, 123, white space, double quotes, ?, !, @, & and commas"
                            }
                        })}
                        >
                        </textarea>
                        <span className="commentValidationText">
                            {errors.comments && errors.comments.type === "required" && <span>Comments are required !</span>}
                            {errors.comments && <span>{errors.comments.message}</span>}
                        </span>
                        <label>
                            <span className="subscriberMsg">{helperText}</span>
                        </label>
                        <section className="col-low contact">
                            <input type="submit" />
                        </section>
                    </form>
                  </div>
              </div>
          </div>
      )
  }
  
  export default Contact;