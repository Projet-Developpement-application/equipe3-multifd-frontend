export default function Inscription(){


    const SignupPage = () => {
        const [formData, setFormData] = useState({
            email: '',
            password: '',
            confirmPassword: '',
            company: '',
            firstName: '',
            lastName: ''
        });

        const [error, setError] = useState('');
        const [submitted, setSubmitted] = useState(false);

        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData(prev => ({ ...prev, [name]: value }));
        };

        const handleSubmit = (e) => {
            e.preventDefault();
            const { password, confirmPassword } = formData;

            if (password !== confirmPassword) {
                setError("Les mots de passe ne correspondent pas.");
                return;
            }

            setError('');
            setSubmitted(true);

            // Ici, tu pourrais envoyer les données au backend via fetch/axios
            console.log("Formulaire soumis :", formData);
        };

        return (
            <div style={{ maxWidth: 400, margin: 'auto', padding: '1rem' }}>
                <h2>Inscription</h2>
                {submitted ? (
                    <p>✅ Inscription réussie !</p>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Courriel :</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Mot de passe :</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Confirmer le mot de passe :</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Entreprise :</label>
                            <input
                                type="text"
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Prénom :</label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Nom :</label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        <button type="submit">S'inscrire</button>
                    </form>
                )}
            </div>
        );
    };

    export default SignupPage;

}