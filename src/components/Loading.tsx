const Loader = () => {
    return (
        <>
            <div style={{
                width: "100%",
                height: "100vh",
                backgroundColor: "rgba(0, 0, 0, 0.2)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "fixed",
                top: 0,
                left: 0,
                zIndex: 1000,
            }}>
                <style>{`
                    @keyframes l3 {
                        to { transform: rotate(1turn); }
                    }
                `}</style>
                
                <div style={{
                    width: "50px",
                    padding: "8px",
                    aspectRatio: "1",
                    borderRadius: "50%",
                    background: "#25b09b",  
                    WebkitMask: "conic-gradient(#0000 10%,#000), linear-gradient(#000 0 0) content-box",
                    mask: "conic-gradient(#0000 10%,#000), linear-gradient(#000 0 0) content-box",
                    WebkitMaskComposite: "source-out",
                    maskComposite: "subtract",
                    animation: "l3 1s infinite linear",
                    margin: "10px auto"
                }}></div>
            </div>
        </>
    )
}

export default Loader;