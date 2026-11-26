import { useMemo, useState } from 'react';

interface IItem {
    id: number;
    name: string;
}

interface IKeysProps {
    sorting: 'ASC' | 'DESC';
    initialData: IItem[];
}

interface IRowProps {
    item: IItem;
    onSave: (id: number, name: string) => void;
}

function Row({ item, onSave }: IRowProps) {
    const [editing, setEditing] = useState(false);
    const [value, setValue] = useState(item.name);

    const startEditing = () => {
        setValue(item.name);
        setEditing(true);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onSave(item.id, value);
            setEditing(false);
        } else if (e.key === 'Escape') {
            setValue(item.name);
            setEditing(false);
        }
    };

    return (
        <li>
            {editing ? (
                <input
                    autoFocus
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
            ) : (
                <span onClick={startEditing}>{item.name}</span>
            )}
        </li>
    );
}

export function Keys({ sorting, initialData }: IKeysProps) {
    const [data, setData] = useState<IItem[]>(initialData);

    const sorted = useMemo(() => {
        const copy = [...data];
        copy.sort((a, b) => (sorting === 'ASC' ? a.id - b.id : b.id - a.id));
        return copy;
    }, [data, sorting]);

    const handleSave = (id: number, name: string) => {
        setData((prev) => prev.map((item) => (item.id === id ? { ...item, name } : item)));
    };

    return (
        <ul>
            {sorted.map((item) => (
                <Row key={item.id} item={item} onSave={handleSave} />
            ))}
        </ul>
    );
}