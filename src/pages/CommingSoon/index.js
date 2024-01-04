import classNames from "classnames/bind";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import FormInput from "~/components/Input";
import Button from "~/components/Button";
import style from './CommingSoon.module.scss'
import API, { endpoints } from "~/configs/API";
const cx = classNames.bind(style)
function CommingSoon() {
    const { pathname } = useLocation();
    const [values, setValues] = useState({
        image: ''
    })
    const onChange = e => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }


    const inputs = [
        {
            id: 7,
            name: "image",
            type: "file",
            label: "Select a image file",
            errormessage: "Selected Wrong File!",
            require: false
        }
    ]

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = `COMMING SOON`
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        const job = new FormData(e.target)
        const job_data = {
            description: 'a',
            type: 1,
        }

        const ADDRESS = {
            contact: 'a',
            phone_number: 'a',
            country: 'a',
            city: 'b',
            street: 'a',
            home_number: 'a'
        }

        const shipment = {
            delivery_address: ADDRESS,
            pick_up: ADDRESS,
            cost: 200
        }

        const products = [
            {
                length: 2,
                width: 2,
                height: 3,
                weight: 5,
                quantity: 4
            }, {
                length: 2,
                width: 2,
                height: 3,
                weight: 5,
                quantity: 4
            }
        ]
        job.append('job', JSON.stringify(job_data))
        job.append('shipment', JSON.stringify(shipment))
        job.append('products', JSON.stringify(products))

        try {
            const res = await API.post(endpoints['job'], job, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            console.log(res.data)
        } catch (e) {
            console.log(e)
        }

    }

    return (<div className={cx('wraaper')}>
        {/* <h1>COMMING SOON</h1>
        <Button outlineGray to={'/'} >Back to Home</Button> */}

        <form onSubmit={handleSubmit}>
            {inputs.map((input) => (
                <FormInput
                    key={input.id}
                    {...input}
                    value={values[input.name]}
                    onChange={onChange}
                />
            ))}

            <div>
                <Button primary>Create</Button>
            </div>

        </form>
    </div>);
}

export default CommingSoon; 
