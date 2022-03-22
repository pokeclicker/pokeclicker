import React, { ReactNode } from 'react';

type Props = {
    children?: ReactNode;
};

const ModalFooter = ({ children }: Props) => (

    <div className="modal-footer">
        { children }
        <button type="button" className="btn btn-primary" data-dismiss="modal">Close</button>
    </div>
);

export default ModalFooter;
