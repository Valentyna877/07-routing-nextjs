import css from "./Footer.module.css";

export default function Footer() {
    return (
        <footer className={css.footer}>
            <div className={css.content}>
                <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
                <div className={css.wrap}>
                    <p>Developer: Valentyna</p>
                    <p>
                        Contact us:
                        <a href="https://github.com/Valentyna877"
                                 target="_blank"
                            rel="noopener noreferrer">
                            GitHub
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
}