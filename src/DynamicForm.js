import React, { useState, useEffect } from 'react';
import formSchema from './formConfig.json';
import styled from 'styled-components';

const FormContainer = styled.form`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h3`
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: 600;
`;

const FieldGroup = styled.div`
  margin-bottom: 25px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-size: 16px;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
  font-size: 14px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
  font-size: 14px;
`;

const Select = styled.select`
  width: 100%;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
  font-size: 14px;
`;

const SubmitButton = styled.button`
  padding: 12px 20px;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  &:hover {
    background-color: #555;
  }
`;

const RadioButton = styled.label`
  margin-right: 15px;
`;

const CheckboxLabel = styled.label`
  margin-right: 10px;
`;

const Slider = styled.input`
  margin: 10px 0;
`;

// DynamicForm Component
const DynamicForm = () => {
  const [formData, setFormData] = useState({});
  const [formConfig, setFormConfig] = useState(formSchema);

  // Load saved form data from localStorage (if available) when the component mounts
  useEffect(() => {
    const savedFormData = localStorage.getItem('formData');
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }
  }, []);

  const handleChange = (groupIndex, fieldIndex, value) => {
    const updatedData = { ...formData };
    const group = formConfig.sections[groupIndex];
    const field = group.fields[fieldIndex];
    updatedData[field.name] = value;

    setFormData(updatedData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    localStorage.setItem('formData', JSON.stringify(formData));
    alert('Form data saved to localStorage!');
  };

  if (!formConfig) {
    return <p>Loading form...</p>;
  }

  return (
    <FormContainer onSubmit={handleSubmit}>
     
      {formConfig.sections.map((group, groupIndex) => (
        <div key={group.title}>
          <SectionTitle>{group.title}</SectionTitle>
          {group.fields.map((field, fieldIndex) => (
            <FieldGroup key={field.name}>
              <Label>{field.label}</Label>

              {field.type === 'text' && (
                <Input
                  type="text"
                  name={field.name}
                  placeholder={field.placeholder}
                  value={formData[field.name] || ''}
                  onChange={(e) => handleChange(groupIndex, fieldIndex, e.target.value)}
                  required={field.required}
                />
              )}

              {field.type === 'textarea' && (
                <TextArea
                  name={field.name}
                  placeholder={field.placeholder}
                  value={formData[field.name] || ''}
                  onChange={(e) => handleChange(groupIndex, fieldIndex, e.target.value)}
                  required={field.required}
                />
              )}

              {field.type === 'dropdown' && (
                <Select
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={(e) => handleChange(groupIndex, fieldIndex, e.target.value)}
                  required={field.required}
                >
                  <option value="">Select {field.label}</option>
                  {field.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
              )}

              {field.type === 'radio' && (
                field.options.map((option) => (
                  <RadioButton key={option.value}>
                    <input
                      type="radio"
                      name={field.name}
                      value={option.value}
                      checked={formData[field.name] === option.value}
                      onChange={(e) => handleChange(groupIndex, fieldIndex, e.target.value)}
                    />
                    {option.label}
                  </RadioButton>
                ))
              )}

              {field.type === 'checkbox' && (
                field.options.map((option) => (
                  <CheckboxLabel key={option.value}>
                    <input
                      type="checkbox"
                      name={field.name}
                      value={option.value}
                      checked={formData[field.name]?.includes(option.value) || false}
                      onChange={(e) => {
                        let updatedValues = [...(formData[field.name] || [])];
                        if (e.target.checked) {
                          updatedValues.push(option.value);
                        } else {
                          updatedValues = updatedValues.filter((val) => val !== option.value);
                        }
                        handleChange(groupIndex, fieldIndex, updatedValues);
                      }}
                    />
                    {option.label}
                  </CheckboxLabel>
                ))
              )}

              {field.type === 'slider' && (
                <Slider
                  type="range"
                  name={field.name}
                  min={field.min}
                  max={field.max}
                  step={field.step}
                  value={formData[field.name] || field.min}
                  onChange={(e) => handleChange(groupIndex, fieldIndex, e.target.value)}
                />
              )}
            </FieldGroup>
          ))}
        </div>
      ))}
      <SubmitButton type="submit">Submit</SubmitButton>
    </FormContainer>
  );
};

export default DynamicForm;
