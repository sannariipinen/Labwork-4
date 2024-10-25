import { useRef, useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function Login () {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState<string | null>(null); // Virhetilan hallinta
    
        const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const auth = getAuth();
    
            // Nollaa virheet ennen uutta yritystä
            setError(null);
    
            const email = emailRef.current?.value;
            const password = passwordRef.current?.value;
    
            try {
                await signInWithEmailAndPassword(auth, email!, password!); // Kirjaudu sisään
                // Onnistunut kirjautuminen, voit siirtyä eteenpäin, esim. redirect
            } catch (err: any) {
                // Käsittele virhe
                setError(err.message); // Näytä virhe
            }
        };
    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Login</h2>
                    {error && <div className="alert alert-danger">{error}</div>} {/* Näytä virhe, jos sellainen on */}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>
                        <Button className="w-100" type="submit">Login</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Don't have an account? Sign up!
            </div>
        </>
    );
}