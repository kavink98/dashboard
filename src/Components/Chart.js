import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Chart(props) {

    const stringToColour = function (str) {
        str = str.split(' ').join('');
        var hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        var colour = '#';
        for (let i = 0; i < 3; i++) {
            var value = (hash >> (i * 8)) & 0xFF;
            colour += ('00' + value.toString(16)).substr(-2);
        }
        return colour;
    }
    if (props.data) {
        return (
            <ResponsiveContainer width="100%" height={500}>
                <LineChart width={1900} height={750}>
                    <CartesianGrid stroke="#eee" strokeDasharray="3 3" />
                    <XAxis
                        dataKey="date"
                        type="category"
                        allowDuplicatedCategory={false}
                    />
                    <YAxis dataKey="acv" />
                    <Tooltip />
                    <Legend />
                    {props.data && props.data.map((s) => (
                        <Line type="monotone" dataKey="acv" data={s.data} name={s.name} key={s.name} stroke={stringToColour(s.name)} />
                    ))}
                </LineChart>
            </ResponsiveContainer>
        )
    }

    else
        return null;
}