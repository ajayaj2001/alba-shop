import React from 'react';
import { LabExamHeader } from './header';
import { Footer } from './footer';

interface LayoutProps {
  children: React.ReactNode;
}
const LabExamLayout = ({ children }: LayoutProps) => (
  <>
    <LabExamHeader />
    {children}
    <Footer />
  </>
);

export default LabExamLayout;
