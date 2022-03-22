import React from 'react';
import Modal from '../common/Modal';
import ModalHeader from '../common/ModalHeader';
import ModalFooter from '../common/ModalFooter';
import LogBookTable from './LogBookTable';
import { useSelector } from '../../hooks';
import LogBookFilters from './LogBookFilters';
import { filteredLogs } from '../../selectors/logbook';

const LogBookModal = () => {
    const logs = useSelector(filteredLogs);

    return (
        <Modal name="logBook">
            <ModalHeader title='Log Book' >
                <button className="btn btn-secondary" type="button" data-toggle="collapse" style={{ marginLeft: '25px' }}
                    data-target="#log-book-filter" aria-expanded="false" aria-controls="breeding-filter">
                        Filters
                </button>
            </ModalHeader>

            <div className="modal-body p-0">
                <LogBookFilters />

                <LogBookTable logs={ logs }/>
            </div>

            <ModalFooter />
        </Modal>
    );
};

export default LogBookModal;
