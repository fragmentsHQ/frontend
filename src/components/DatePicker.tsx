import React, { useState } from "react";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

export default function MaterialUIPickers({ selected, setSelected, setShowThisSection, showThisSection }) {

    
    const handleChange = (newValue) => {
        const endD = new Date(newValue);
        
        setSelected(endD.getTime()/ 1000);
        setShowThisSection({
            ...showThisSection,
            2: true,
        });
    };

    return (
        <div className="w-full flex ">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                    // label="Select End Date"
                    value={selected}
                    onChange={handleChange}
                    inputProps={{ style: { paddingLeft: "12px", paddingRight: "12px", paddingTop : "8px", paddingBottom : "8px", backgroundColor : "#262229", color: "white"  ,borderWidth : "0"},  }}
                    // disablePast={true}
                    renderInput={(params) => <TextField className="bg-black" {...params} />}
                />
            </LocalizationProvider>
        </div>
    );
}