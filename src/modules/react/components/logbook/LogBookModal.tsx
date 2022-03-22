import React from 'react';
import Modal from '../common/Modal';
import ModalHeader from '../common/ModalHeader';
import ModalFooter from '../common/ModalFooter';
import LogBookTable from './LogBookTable';
import { useGame } from '../../hooks/useGame';
import LogBookFilters from './LogBookFilters';

const LogBookModal = () => {
    const Game = useGame();
    const filteredLogs = Game.logbook.filteredLogs();

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

                <LogBookTable logs={ filteredLogs }/>
            </div>

            <ModalFooter />
        </Modal>
    );
};

export default LogBookModal;
