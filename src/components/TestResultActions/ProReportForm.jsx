'use client'

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { Theme } from '../../styles/Theme';
import { FaTimes, FaFileAlt, FaUser, FaHashtag, FaTools } from 'react-icons/fa';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const FormContainer = styled.div`
  background: #fff;
  width: 90%;
  max-width: 500px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
  position: relative;
`;

const FormHeader = styled.div`
  background: ${Theme.primary};
  color: white;
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    margin: 0;
    font-size: 1.25rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
`;

const CloseButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const FormBody = styled.div`
  padding: 1.5rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.25rem;

  label {
    display: block;
    font-size: 0.85rem;
    font-weight: 700;
    color: ${Theme.textSecondary};
    margin-bottom: 0.5rem;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    svg {
      color: ${Theme.primary};
    }
  }

  input, textarea {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 1px solid ${Theme.border};
    border-radius: 8px;
    font-size: 1rem;
    background: ${Theme.backgroundLight};
    transition: all 0.2s;

    &:focus {
      outline: none;
      border-color: ${Theme.primary};
      background: white;
      box-shadow: 0 0 0 3px ${Theme.primary}20;
    }
  }

  textarea {
    min-height: 80px;
    resize: vertical;
  }
`;

const FormFooter = styled.div`
  padding: 1rem 1.5rem;
  background: ${Theme.backgroundLight};
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s;
`;

const CancelButton = styled(Button)`
  background: white;
  border: 1px solid ${Theme.border};
  color: ${Theme.textPrimary};

  &:hover {
    background: #f8fafc;
    border-color: ${Theme.textSecondary};
  }
`;

const SubmitButton = styled(Button)`
  background: ${Theme.primary};
  border: none;
  color: white;
  box-shadow: 0 4px 12px ${Theme.primary}40;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 15px ${Theme.primary}60;
    background: ${Theme.accent};
  }
`;

export default function ProReportForm({ onClose, onSubmit, defaultData = {} }) {
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    customerName: defaultData.customerName || '',
    orderNumber: defaultData.orderNumber || '',
    technicianName: defaultData.technicianName || '',
    notes: defaultData.notes || '',
    serialNumber: defaultData.serialNumber || ''
  });

  useEffect(() => {
    setMounted(true);
    // Prevent scrolling on body when modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
      setMounted(false);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('ProReportForm: Submitting', formData);
    onSubmit(formData);
  };

  if (!mounted) return null;

  const modalContent = (
    <ModalOverlay onClick={(e) => e.target === e.currentTarget && onClose()}>
      <FormContainer onClick={(e) => e.stopPropagation()}>
        <FormHeader>
          <h3><FaFileAlt /> Professional Report Details</h3>
          <CloseButton onClick={onClose} aria-label="Close"><FaTimes /></CloseButton>
        </FormHeader>
        <form onSubmit={handleFormSubmit}>
          <FormBody>
            <FormGroup>
              <label><FaUser /> Customer Name</label>
              <input
                type="text"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                placeholder="e.g. John Doe"
                autoFocus
              />
            </FormGroup>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <FormGroup>
                <label><FaHashtag /> Order / Ticket #</label>
                <input
                  type="text"
                  name="orderNumber"
                  value={formData.orderNumber}
                  onChange={handleChange}
                  placeholder="e.g. 5501"
                />
              </FormGroup>
              <FormGroup>
                <label><FaHashtag /> Serial Number</label>
                <input
                  type="text"
                  name="serialNumber"
                  value={formData.serialNumber}
                  onChange={handleChange}
                  placeholder="Optional"
                />
              </FormGroup>
            </div>
            <FormGroup>
              <label><FaTools /> Technician Name</label>
              <input
                type="text"
                name="technicianName"
                value={formData.technicianName}
                onChange={handleChange}
                placeholder="Your Name or ID"
              />
            </FormGroup>
            <FormGroup>
              <label>Repair / Test Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Describe any repairs made or stick drift symptoms..."
              />
            </FormGroup>
          </FormBody>
          <FormFooter>
            <CancelButton type="button" onClick={onClose}>Cancel</CancelButton>
            <SubmitButton type="submit">
              Generate Certificate
            </SubmitButton>
          </FormFooter>
        </form>
      </FormContainer>
    </ModalOverlay>
  );

  return createPortal(modalContent, document.body);
}
