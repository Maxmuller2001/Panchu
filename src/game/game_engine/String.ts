// Contains extra string manipulation options

function pad(n: number): string {
    return (n < 10) ? (`0${n.toString()}`) : n.toString();
}