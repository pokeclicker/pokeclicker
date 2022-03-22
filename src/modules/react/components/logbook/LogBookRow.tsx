import React from 'react';
import LogBookLog from '../../../logbook/LogBookLog';

type Props = {
    log: LogBookLog
};

const LogBookRow = ({ log }: Props) => (
    <tr>
        <td className={`tight table-${log.type.display}`}>
            { log.type.label }
        </td>
        <td className="text-left">
            { log.description }
        </td>
        <td className="text-left">
            <code>
                { new Date(log.date).toLocaleString() }
            </code>
        </td>
    </tr>
);

export default LogBookRow;
