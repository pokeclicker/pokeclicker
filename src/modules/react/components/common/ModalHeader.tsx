import React, { ReactNode } from 'react';

type Props = {
    title: string,
    children?: ReactNode;
};

const ModalHeader = ({ title, children }: Props) => (
    <div className="modal-header" style={{ justifyContent: 'space-around' }}>
        <h5 className="modal-title">{ title }</h5>
        { children }
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
);

export default ModalHeader;
