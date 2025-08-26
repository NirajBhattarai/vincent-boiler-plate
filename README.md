# Vincent Boilerplate

A minimal Next.js application with Vincent authentication integration using `@lit-protocol/vincent-app-sdk`.

## 📋 Requirements

### System Requirements
- **Node.js**: Version 20.11.1 or higher (recommended: 24.x)
- **npm**: Version 8.0.0 or higher
- **Git**: For version control

### Vincent Requirements
- **Vincent App ID**: You need a valid Vincent application ID
- **Vincent Account**: Access to Vincent dashboard to manage your app

## 🚀 Quick Start

### 1. Clone and Setup
```bash
# Navigate to the boilerplate directory
cd vincent-boilerplate

# Install dependencies
npm install
```

### 2. Environment Configuration
```bash
# Copy environment template
cp env.example .env.local

# Edit .env.local with your Vincent App ID
# NEXT_PUBLIC_VINCENT_APP_ID=your_actual_app_id_here
```

### 3. Start Development Server
```bash
npm run dev
```

Visit `http://localhost:3000` to see your app.

## 📁 Project Structure

```
vincent-boilerplate/
├── app/
│   ├── components/
│   │   └── navbar.tsx          # Navigation with user profile
│   ├── lib/
│   │   └── vincent-auth.ts     # Vincent authentication utilities
│   ├── login/
│   │   └── page.tsx            # Auth callback route
│   ├── globals.css             # Tailwind CSS styles
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Main landing page
├── env.example                 # Environment variables template
├── package.json                # Dependencies and scripts
├── tailwind.config.js          # Tailwind CSS configuration
├── postcss.config.js           # PostCSS configuration
├── next.config.js              # Next.js configuration
└── tsconfig.json               # TypeScript configuration
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🔐 Authentication Flow

1. **Login**: User clicks "Login with Vincent" → redirects to Vincent Connect
2. **Callback**: Vincent redirects back to `/login?jwt=...` 
3. **Storage**: JWT is stored in localStorage
4. **UI Update**: Navbar shows user address and profile dropdown

## 🎨 Features

- **Modern UI**: Clean design with Tailwind CSS
- **User Profile**: Shows wallet address in top-right navbar
- **Copy Address**: One-click copy wallet address
- **Secure Logout**: Proper JWT cleanup and redirect
- **Responsive**: Works on desktop and mobile
- **TypeScript**: Full type safety

## 🛠️ Customization

### Adding New Pages
```bash
# Create new page
mkdir app/your-page
touch app/your-page/page.tsx
```

### Styling
- Uses Tailwind CSS for styling
- Modify `tailwind.config.js` for custom theme
- Add custom styles in `app/globals.css`

### Authentication
- All auth logic is in `app/lib/vincent-auth.ts`
- Extend `VincentUser` interface for additional user data
- Modify auth flow in `handleVincentAuth()` function

## 🚨 Troubleshooting

### Common Issues

**"Module not found: Can't resolve 'lucide-react'"**
```bash
npm install
```

**"NEXT_PUBLIC_VINCENT_APP_ID is required"**
- Make sure `.env.local` exists and has your app ID
- Restart the dev server after changing environment variables

**Authentication not working**
- Verify your Vincent App ID is correct
- Check browser console for errors
- Ensure `/login` route is accessible

**Node version warnings**
- The app works with Node 24.x despite warnings
- For production, use Node 20.11.1+ as recommended

### Development Tips

1. **Environment Variables**: Always restart dev server after changing `.env.local`
2. **JWT Debugging**: Check browser localStorage for stored JWT
3. **Network Issues**: Ensure Vincent services are accessible
4. **TypeScript Errors**: Run `npm run lint` to check for issues

## 📦 Dependencies

### Core Dependencies
- `next`: 14.2.5 - React framework
- `react`: 18.2.0 - UI library
- `@lit-protocol/vincent-app-sdk`: ^0.0.12-mma - Vincent authentication
- `lucide-react`: ^0.263.1 - Icons

### Development Dependencies
- `typescript`: 5.4.5 - Type safety
- `tailwindcss`: ^3.3.2 - CSS framework
- `eslint`: 8.57.0 - Code linting
- `autoprefixer`: ^10.4.14 - CSS compatibility

## 🚀 Production Deployment

### Build for Production
```bash
npm run build
npm start
```

### Environment Variables for Production
- Set `NEXT_PUBLIC_VINCENT_APP_ID` in your hosting platform
- Ensure HTTPS is enabled (required for Vincent auth)

### Recommended Hosting
- Vercel (recommended for Next.js)
- Netlify
- AWS Amplify
- Any platform supporting Node.js

## 📚 Additional Resources

- [Vincent Documentation](https://docs.heyvincent.ai/documents/Getting_Started.html)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Lit Protocol](https://litprotocol.com/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

