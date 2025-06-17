from app import app, db

# Ensure all tables are created if they do not exist
with app.app_context():
    db.create_all()


@app.shell_context_processor
def make_shell_context():
    return {"db": db}

if __name__ == '__main__':
    # It's good practice to create the tables right before running the app.
    # The app_context is needed for db to know which app's database to connect to.
    with app.app_context():
        db.create_all()
    
    # This is the crucial line that starts the web server.
    app.run(debug=True)
