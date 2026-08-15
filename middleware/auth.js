import jwt from 'jsonwebtoken';


export const authenticate = (req, res, next) => {
    const JWT_SECRET = process.env.JWT_SECRET;

    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: 'No token provided' });
    const token = authHeader.split(' ')[1];
    
    jwt.verify(token, JWT_SECRET, (err, user) => {
        
        if (err) return res.status(403).json({ message: 'Unauthorized' });
        req.user = user;
        next();
    });
};