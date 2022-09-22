import React, { useState, useEffect } from 'react'
import Styles from './ArchitectCreateForm.module.css'
import axios from "axios"
import { AiFillCloseCircle } from 'react-icons/ai'
import { toast, ToastContainer } from 'react-toastify'
import Select from 'react-select'
import Option from '../DropDown/Options'
import { default as ReactSelect } from "react-select";
const PMCCreateForm = ({ modalHandler, setIsOpen, parentCallback }) => {
    let initialState = {
        name: "",
        email: "",
        mobileno: "",
        address: "",
        branchname: "",
        salesMan: "",
        IFSCcode: "",
        companyName: "",
        birthdate: "",
        marriagedate: "",
        remarks: "",
        bankname: "",
        adharcard: "",
        pancard: "",
        date: "",
        branches: [],



    }
    const getAllbranches = async () => {
        const { data } = await axios.get("/api/v1/branch/getall");

        const branches = data.branches.map((branch) => (
            {
                branchname: branch.branchname,
                value: branch.branchname,
                label: branch.branchname
            }
        ))
        setBranches(branches);
    }

    useEffect(() => {
        getAllbranches();
    }, []);
    const [formData, setFormData] = useState(initialState)
    const [isDisabled, setIsDisabled] = useState(false);
    const [Branches, setBranches] = useState([]);
    const [selectedBranch, setselectedBranch] = useState([]);
    const formHandler = (e) => {
        e.preventDefault();
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        setIsDisabled(true);
        let data = {
            name: formData.name,
            email: formData.email,
            mobileno: formData.mobileno,
            address: formData.address,
            companyName: formData.companyName,
            birthdate: formData.birthdate,
            marriagedate: formData.marriagedate,
            remarks: formData.remarks,
            bankname: formData.bankname,
            branchname: formData.branchname,
            salesMan: formData.salesMan,
            adharcard: formData.adharcard,
            pancard: formData.pancard,
            date: formData.date,
            IFSCcode: formData.IFSCcode,
            branches: selectedBranch

        }

        try {
            const response = await axios.post("/api/v1/pmc/create", data, { headers: { "Content-Type": "application/json" } });
            console.log(response);
            
            parentCallback(true);
            setIsOpen(false);
        }
        catch (e) {
            toast.error(e.response.data.message);
            console.log(e.response.data.message)
            setIsDisabled(false);
        }

    }
    const Branchchangehandler = (selected) => {

        setselectedBranch(selected);
        console.log(selected);
        setFormData({ ...formData, selectedBranch })
    };
    return (
        <div className={Styles.container}>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <div className={Styles.closebutton} onClick={modalHandler}>
                <AiFillCloseCircle />
            </div>
            <h1 className={Styles.heading}>PMC Details</h1>
            <div className={Styles.personalDetails}>

                <div className={Styles.personalDetails1}>

                    <label htmlFor='name'>Name</label>
                    <input className={Styles.inputTag} onChange={(e) => { formHandler(e) }} value={formData.name} name="name" placeholder='PMC Name' />

                    <label htmlFor='mobileno'>Mobile Number</label>
                    <input className={Styles.inputTag} onChange={(e) => { formHandler(e) }} value={formData.mobileno} name="mobileno" placeholder='Mobile Number' />

                    <label htmlFor='email'>Email</label>
                    <input className={Styles.inputTag} onChange={(e) => { formHandler(e) }} value={FormData.email} name="email" placeholder='email' />

                    <label htmlFor='AddressLine1'>Address</label>
                    <input className={Styles.inputTag} onChange={(e) => { formHandler(e) }} value={formData.address} name="address" placeholder='address' />

                    <label htmlFor='AddressLine1'>Remarks</label>
                    <input className={Styles.inputTag} onChange={(e) => { formHandler(e) }} value={formData.remarks} name="remarks" placeholder='Remarks' />
                </div>

                <div className={Styles.personalDetails2}>

                    <label htmlFor='date'>Date</label>
                    <input className={Styles.inputTag} onChange={(e) => { formHandler(e) }} value={formData.date} name="date" type="date" placeholder='Created At' />

                    <label htmlFor='birthdate'>Birth Date</label>
                    <input className={Styles.inputTag} onChange={(e) => { formHandler(e) }} value={formData.birthdate} name="birthdate" type="date" placeholder='Birthdate' />

                    <label htmlFor='marrieagedate'>Marriage Date</label>
                    <input className={Styles.inputTag} onChange={(e) => { formHandler(e) }} value={formData.marrieagedate} name="marriagedate" type="date" placeholder='Annivarsary' />

                    <label htmlFor='companyName'>Company Name</label>
                    <input className={Styles.inputTag} onChange={(e) => { formHandler(e) }} value={formData.companyName} name="companyName" placeholder='Company Name' />

                    <label htmlFor='salesMan'>Sales Man </label>
                    <input className={Styles.inputTag} onChange={(e) => { formHandler(e) }} value={formData.salesMan} name="salesMan" placeholder='Sales Man' />
                    <label>Branches</label>
                    <ReactSelect lassName={Styles.inputTag}
                        options={Branches}
                        isMulti
                        closeMenuOnSelect={false}
                        hideSelectedOptions={false}
                        components={{
                            Option
                        }}
                        onChange={Branchchangehandler}
                        allowSelectAll={true}
                        value={selectedBranch}
                    />
                </div>
            </div>

            <h1 className={Styles.heading}>Bank Details</h1>
            <div className={Styles.bankDetails}>

                <div className={Styles.bankDetails1}>
                    <label htmlFor='bankname'>Bank Name</label>
                    <input className={Styles.inputTag} onChange={(e) => { formHandler(e) }} value={formData.bankname} name="bankname" placeholder='Bank Name' />

                    <label htmlFor='branchname'>Branch Name</label>
                    <input className={Styles.inputTag} onChange={(e) => { formHandler(e) }} value={formData.branchname} name="branchname" placeholder='Branch Name' />

                    <label htmlFor='IFSCCode'>IFSC Code</label>
                    <input className={Styles.inputTag} onChange={(e) => { formHandler(e) }} value={formData.IFSCcode} name="IFSCcode" placeholder='IFSC Code' />
                </div>

                <div className={Styles.bankDetails2}>
                    <label htmlFor='adharcard'>Adhar Card</label>
                    <input className={Styles.inputTag} onChange={(e) => { formHandler(e) }} value={formData.adharcard} name="adharcard" placeholder='Adhar Card' />

                    <label htmlFor='pancard'>Pan Card</label>
                    <input className={Styles.inputTag} onChange={(e) => { formHandler(e) }} value={formData.pancard} name="pancard" placeholder='Pan Card' />
                </div>
            </div>

            <button disabled={isDisabled} className={isDisabled ? Styles.disable : Styles.submitButton} onClick={submitHandler} type="Submit">Submit</button>
        </div>
    )
}

export default PMCCreateForm