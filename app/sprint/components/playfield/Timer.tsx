export default function Timer(props: {
  time: string;
  color: string;
  textColor: String;
}) {
  return (
    <div
      className={`w-full h-full mx-auto px-8 text-center text-2xl font-bold content-center rounded-full drop-shadow-lg ${props.color} ${props.textColor}`}
    >
      {props.time}
    </div>
  );
}
