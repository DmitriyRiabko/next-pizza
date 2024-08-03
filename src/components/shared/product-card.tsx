import { Link } from 'lucide-react';
import React from 'react';

interface Props {
    className?: string;
}

export const ProductCard: React.FC<Props> = ({ className }) => {
  return (
    <div className={className}>

        <Link/>
    </div>
  );
};