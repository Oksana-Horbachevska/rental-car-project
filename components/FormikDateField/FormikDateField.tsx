'use client';

import { FieldProps, useField } from 'formik';
import DatePicker from '@/components/DatePicker/DatePicker.client';

interface Props {
  name: string;
  placeholder?: string;
}

export default function FormikDateField({ name, placeholder }: Props) {
  const [field, , helpers] = useField(name);

  const value = field.value ? new Date(field.value) : null;

  return (
    <DatePicker
      value={value}
      onChange={d => helpers.setValue(d ? d.toISOString() : '')}
      placeholder={placeholder}
      name={name}
    />
  );
}
