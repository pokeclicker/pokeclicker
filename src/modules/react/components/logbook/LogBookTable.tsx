import React from 'react';
import LogBookRow from './LogBookRow';
import LogBookLog from '../../../logbook/LogBookLog';

type Props = {
    logs: LogBookLog[];
};

const LogBookTable = ({ logs }: Props) => (
    <table className="table table-striped table-hover table-bordered table-sm m-0">
        <thead>
            <tr>
                <th>Type</th>
                <th>Message</th>
                <th>Date</th>
            </tr>
        </thead>
        <tbody>
            { logs.map((log) => (
                <LogBookRow log={log} key={`log-${log.id}`} />
            ))}
        </tbody>
    </table>
);

export default LogBookTable;
