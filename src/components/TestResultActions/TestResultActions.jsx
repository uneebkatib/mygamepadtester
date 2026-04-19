'use client'

import React, { useState } from 'react';
import styled from 'styled-components';
import { useI18n } from '@/contexts/I18nContext';
import jsPDF from 'jspdf';
import { submitTestData } from '@/lib/firebase';

const ExportButton = styled.button`
  background: #DA7756;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  margin-right: 0.5rem;
  
  &:hover {
    background: #c56a4a;
    transform: translateY(-2px);
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
  }
`;

const SubmitButton = styled(ExportButton)`
  background: #10B981;
  
  &:hover {
    background: #059669;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  flex-wrap: wrap;
`;

const Message = styled.div`
  padding: 0.75rem 1rem;
  border-radius: 8px;
  margin-top: 1rem;
  background: ${props => props.$success ? '#d1fae5' : '#fee2e2'};
  color: ${props => props.$success ? '#065f46' : '#991b1b'};
  border: 1px solid ${props => props.$success ? '#a7f3d0' : '#fecaca'};
`;

export default function TestResultActions({ testResults }) {
    const { t } = useI18n();
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState(null);

    const exportPDF = () => {
        try {
            const pdf = new jsPDF();

            // Title
            pdf.setFontSize(20);
            pdf.text(t('pdfReport.title'), 20, 20);

            // Controller info
            pdf.setFontSize(12);
            pdf.text(`${t('pdfReport.controller')}: ${testResults.controllerName || 'Unknown'}`, 20, 40);
            pdf.text(`${t('pdfReport.testDate')}: ${new Date(testResults.timestamp).toLocaleDateString()}`, 20, 50);
            pdf.text(`${t('pdfReport.healthScore')}: ${testResults.healthScore || 'N/A'}/100`, 20, 60);

            // Detailed results
            pdf.setFontSize(14);
            pdf.text(t('pdfReport.detailedResults'), 20, 80);

            pdf.setFontSize(11);
            pdf.text(`• ${t('pdfReport.leftStickDrift')}: ${testResults.driftLeft || 0}%`, 25, 95);
            pdf.text(`• ${t('pdfReport.rightStickDrift')}: ${testResults.driftRight || 0}%`, 25, 105);
            pdf.text(`• ${t('pdfReport.averageLatency')}: ${testResults.latency || 0}ms`, 25, 115);
            pdf.text(`• ${t('pdfReport.buttonsWorking')}: ${testResults.buttonsWorking || 0}/${testResults.buttonsTotal || 0}`, 25, 125);

            // Footer
            pdf.setFontSize(10);
            pdf.text(t('pdfReport.generatedBy'), 20, 280);

            // Save
            pdf.save(`controller-report-${Date.now()}.pdf`);

            setMessage({ text: 'PDF exported successfully!', success: true });
            setTimeout(() => setMessage(null), 3000);
        } catch (error) {
            console.error('Error generating PDF:', error);
            setMessage({ text: 'Failed to export PDF', success: false });
            setTimeout(() => setMessage(null), 3000);
        }
    };

    const submitToDatabase = async () => {
        setSubmitting(true);
        try {
            const dataToSubmit = {
                controllerName: testResults.controllerName || 'Unknown Controller',
                timestamp: testResults.timestamp || new Date().toISOString(),
                driftLeft: testResults.driftLeft || 0,
                driftRight: testResults.driftRight || 0,
                latency: testResults.latency || 0,
                buttonsWorking: testResults.buttonsWorking || 0,
                buttonsTotal: testResults.buttonsTotal || 0,
                healthScore: testResults.healthScore || 0,
                issues: testResults.issues || []
            };

            // Submit to global Firebase database
            const result = await submitTestData(dataToSubmit);

            if (result.success) {
                // Also save locally for user's own reference
                const STORAGE_KEY = 'controller_test_data';
                const existingData = localStorage.getItem(STORAGE_KEY);
                const allData = existingData ? JSON.parse(existingData) : [];
                allData.push({ ...dataToSubmit, id: result.id });
                if (allData.length > 1000) allData.shift();
                localStorage.setItem(STORAGE_KEY, JSON.stringify(allData));

                setMessage({
                    text: 'Test data submitted to global database! Thank you for contributing to our worldwide controller health study.',
                    success: true
                });
            } else {
                setMessage({ text: result.error || 'Failed to submit data', success: false });
            }
        } catch (error) {
            console.error('Error submitting data:', error);
            setMessage({ text: 'Failed to submit data', success: false });
        } finally {
            setSubmitting(false);
            setTimeout(() => setMessage(null), 5000);
        }
    };

    return (
        <div>
            <ButtonGroup>
                <ExportButton onClick={exportPDF}>
                    📄 {t('common.exportPDF')}
                </ExportButton>
                <SubmitButton onClick={submitToDatabase} disabled={submitting}>
                    📊 {submitting ? 'Submitting...' : t('database.submitYourData')}
                </SubmitButton>
            </ButtonGroup>

            {message && (
                <Message $success={message.success}>
                    {message.text}
                </Message>
            )}
        </div>
    );
}
