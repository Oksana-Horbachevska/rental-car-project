'use client';

import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import css from './DatePicker.module.css';

interface Props {
  value: Date | null;
  onChange: (date: Date | null) => void;
  placeholder?: string;
  name?: string;
  className?: string;
  minDate?: Date;
  maxDate?: Date;
}

const DatePicker = ({
  value,
  onChange,
  placeholder = 'Booking date',
  name,
  className,
  minDate,
  maxDate,
}: Props) => {
  return (
    <div className={`${css.wrapper} ${className ?? ''}`}>
      <ReactDatePicker
        selected={value}
        onChange={onChange}
        placeholderText={placeholder}
        dateFormat="dd-MM-yyyy"
        name={name}
        minDate={minDate}
        maxDate={maxDate}
        showPopperArrow={false}
        className={css.input}
      />
    </div>
  );
};

export default DatePicker;
