// import TextField from '@mui/material/TextField';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import React from 'react';

// export default function MaterialUIPickers({
//   selected,
//   setSelected,
//   setShowThisSection,
//   showThisSection,
// }) {
//   const handleChange = (newValue) => {
//     const endD = new Date(newValue);

//     setSelected(endD.getTime() / 1000);
//     setShowThisSection({
//       ...showThisSection,
//       2: true,
//     });
//   };

//   return (
//     <div className='flex w-full '>
//       <LocalizationProvider dateAdapter={AdapterDayjs}>
//         <DateTimePicker
//           // label="Select End Date"
//           value={selected * 1000}
//           onChange={handleChange}
//           inputProps={{
//             style: {
//               paddingLeft: '12px',
//               paddingRight: '12px',
//               paddingTop: '8px',
//               paddingBottom: '8px',
//               backgroundColor: '#262229',
//               color: 'white',
//               borderWidth: '0',
//             },
//           }}
//           // disablePast={true}
//           renderInput={(params) => (
//             <TextField className='bg-black' {...params} />
//           )}
//         />
//       </LocalizationProvider>
//     </div>
//   );
// }

import { TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import * as React from 'react';
import toast from 'react-hot-toast';

export default function MaterialUIPickers({
  selected,
  setSelected,
  setShowThisSection,
  showThisSection,
}) {
  const [value, setValue] = React.useState<Dayjs | null>(
    dayjs().add(1, 'hour')
  );

  const [isError, setError] = React.useState(false);

  const handleChange = (newValue) => {
    const d = dayjs(newValue).toDate().getTime();
    if (isError) {
      setShowThisSection({
        ...showThisSection,
        2: false,
      });
    }
    console.log(d);
    setSelected(d);
    setShowThisSection({
      ...showThisSection,
      2: true,
    });
  };
  React.useEffect(() => {
    setShowThisSection({
      ...showThisSection,
      2: true,
    });
  }, []);

  return (
    <div className='flex items-center justify-start'>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          label=''
          disablePast
          value={value}
          onChange={(da) => {
            setValue(dayjs(new Date(da)));
            handleChange(da);
          }}
          onError={(data) => {
            setError(!!data);
            if (data) {
              toast.error('Invalid date selected');
              setShowThisSection({
                ...showThisSection,
                2: false,
              });
            }
          }}
          onAccept={() => {
            if (!isError) {
              setShowThisSection({
                ...showThisSection,
                2: true,
              });
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              inputProps={{ ...params.inputProps, readOnly: true }}
            />
          )}
        />
      </LocalizationProvider>
    </div>
  );
}
