import React, { ReactNode } from 'react';

type Props = {
    name: string;
    children: ReactNode;
};

const Modal = ({ name, children }: Props) => (
    <div className="modal noselect fade" id={`${name}Modal`} tabIndex={-1} role="dialog" aria-labelledby={`${name}ModalLabel`}>
        <div className="modal-dialog modal-dialog-scrollable modal-lg" role="document">
            <div className="modal-content">
                { children }
            </div>
        </div>
    </div>

);

export default Modal;
