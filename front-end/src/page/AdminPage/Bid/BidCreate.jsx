import React, { useEffect, useRef, useState } from 'react';
import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
    Radio,
} from '@material-tailwind/react';
import PropertyModal from './PropertyModal';
import { useCreateBidMutation } from '~/app/service/bid.service';
// import classNames from 'classnames/bind';
import SimpleMdeReact from 'react-simplemde-editor';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
// import styles from './BidCreate.module.scss';
// const cx = classNames.bind(styles);
function BidCreate() {
    const navigate = useNavigate();
    const [createBid] = useCreateBidMutation();
    const [dateTime, setDateTime] = useState('');
    const [property, setProperty] = useState({});
    const [reservePrice, setReservePrice] = useState('');
    const [priceStep, setPriceStep] = useState('');
    const [conditionReport, setConditionReport] = useState('');
    const [type, setType] = useState('public');
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    useEffect(() => {
        console.log(type);
    }, type);
    const handleDateTimeChange = (event) => {
        setDateTime(event.target.value);
    };
    console.log(dateTime);
    console.log(open);
    console.log(property);
    const handleCreate = () => {
        createBid({
            type,
            dayOfSale: dateTime,
            conditionReport,
            reservePrice,
            priceStep,
            propertyId: property.id,
        })
            .unwrap()
            .then(() => {
                toast.success('Create bid success');
                setTimeout(() => {
                    navigate('/admin/open-bid');
                }, 1000);
            })
            .catch((err) => toast.error(err));
    };
    return (
        <>
            <Card color="transparent" shadow={false} ref={ref}>
                <Typography variant="h4" color="blue-gray">
                    Create Bid Room
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                    Enter your details to create.
                </Typography>
                <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                    <div className="mb-4 flex flex-col gap-6">
                        <Input
                            size="lg"
                            label="Property"
                            defaultValue={property.name}
                            onClick={() => {
                                setOpen((prev) => !prev);
                            }}
                        />
                        <PropertyModal
                            appElement={ref.current}
                            open={open}
                            setOpen={setOpen}
                            setProperty={setProperty}
                        />
                        {property.category && property.owner && (
                            <>
                                <Input
                                    size="lg"
                                    label="Category"
                                    defaultValue={property.category}
                                />
                                <Input
                                    size="lg"
                                    label="Owner"
                                    defaultValue={
                                        property.owner.username ||
                                        property.owner.email
                                    }
                                />
                                <label>conditionReport</label>
                                <SimpleMdeReact
                                    value={conditionReport}
                                    onChange={(value) =>
                                        setConditionReport(value)
                                    }
                                />
                                <div>Image</div>
                                <Input
                                    size="lg"
                                    label="Reserve Price"
                                    defaultValue={reservePrice}
                                    onChange={(e) =>
                                        setReservePrice(e.target.value)
                                    }
                                />
                                <Input
                                    size="lg"
                                    label="Price Step"
                                    defaultValue={priceStep}
                                    onChange={(e) =>
                                        setPriceStep(e.target.value)
                                    }
                                />
                            </>
                        )}
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label
                            htmlFor="datetime"
                            className="text-lg font-medium"
                        >
                            DAY OF SALE :
                        </label>
                        <input
                            type="datetime-local"
                            id="datetime"
                            name="datetime"
                            value={dateTime}
                            onChange={handleDateTimeChange}
                            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            min={new Date().toISOString().split('.')[0]}
                        />
                    </div>
                    <div className="flex gap-10">
                        <Radio
                            id="public-type-bid"
                            name="type"
                            label="Public"
                            value="public"
                            onChange={(e) => setType(e.target.value)}
                            defaultChecked
                        />
                        <Radio
                            id="hidden-type-bid"
                            name="type"
                            label="Hidden"
                            value="hidden"
                            onChange={(e) => setType(e.target.value)}
                        />
                    </div>
                    <Checkbox
                        label={
                            <Typography
                                variant="small"
                                color="gray"
                                className="flex items-center font-normal"
                            >
                                I agree the
                                <a
                                    href="#"
                                    className="font-medium transition-colors hover:text-blue-500"
                                >
                                    &nbsp;Terms and Conditions
                                </a>
                            </Typography>
                        }
                        containerProps={{ className: '-ml-2.5' }}
                    />
                    <Button
                        className="mt-6"
                        fullWidth
                        onClick={() => handleCreate()}
                    >
                        Create
                    </Button>
                </form>
            </Card>
            <ToastContainer />
        </>
    );
}

export default BidCreate;
