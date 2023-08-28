import mysql.connector as mysql

db = mysql.connect(
    host="localhost",
    user="root",
    password="[covered]",
    database="movie_db"
)

query = db.cursor()

query.execute("SET SESSION group_concat_max_len = 1000000")

query.execute("SELECT a.actor_name, GROUP_CONCAT(other.actor_name) FROM actor as a JOIN movie_actor AS ma on a.actor_id = ma.actor_id JOIN movie as m on m.movie_id = ma.movie_id JOIN movie_actor as other_ma on m.movie_id = other_ma.movie_id join actor as other on other_ma.actor_id = other.actor_id GROUP BY a.actor_name ")
# query.execute("SELECT actor_name, title FROM actor JOIN movie_actor AS ma ON actor.actor_id = ma.actor_id JOIN movie ON ma.movie_id = movie.movie_id where title = \"Like Stars On Earth\"")

result = query.fetchall()

# Make adjacency list
adj_list = dict()

def remove_dupe_and_self(name, l):
    s = set()
    for i in l.split(','):
        if i != name:
            s.add(i)
    return list(s)

for x in result:
    adj_list[x[0]] = remove_dupe_and_self(x[0], x[1])

# connectivity test
def is_connected(adj):
    visited = dict()
    for key in adj:
        visited[key] = False

    q = []
    # Start with Christian Bale because I like Batman/Dark Knight trilogy
    q.append('Christian Bale')
    while len(q) > 0:
        top = q.pop(0)
        visited[top] = True
        for connection in adj[top]:
            if not visited[connection]:
                q.append(connection)

    # Now traverse adjacency list and see if it's all true
    for key, value in visited.items():
        if not value and key != '':
            # Print the actor who isn't connected
            print(key)
            return False
    
    # Everyone is connected
    return True

def count_kevin(adj):
    visited = dict()
    for key in adj:
        visited[key] = False

    q = []

    q.append('Kevin Bacon')
    count = 0
    while len(q) > 0:
        top = q.pop(0)
        if not visited[top]:
            count += 1
            visited[top] = True
            for connection in adj[top]:
                if not visited[connection]:
                    q.append(connection)

    return count

# How many different connected groups are there?
def find_groups(adj):
    visited = dict()
    for key in adj:
        visited[key] = False

    count_groups = 0

    for actor in visited:
        if visited[actor] == False:
            count_groups += 1
            q = [actor]
            
            while len(q) > 0:
                top = q.pop(0)
                if not visited[top]:
                    visited[top] = True
                    for connection in adj[top]:
                        if not visited[connection]:
                            q.append(connection)

    return count_groups


# who is connected to kevin bacon but the furthest away
def furthest_kevin(adj):
    # visited now should store the distance
    visited = dict()
    for key in adj:
        visited[key] = 0

    q = []

    q.append('Kevin Bacon')
    while len(q) > 0:
        top = q.pop(0)
        for connection in adj[top]:
            if visited[connection] == 0:
                visited[connection] = visited[top] + 1
                q.append(connection)

    max_actor = ''
    max_distance = 0

    # sanity check, make sure this is 3631
    count = 0
    for key, value in visited.items():
        if value > 0:
            count += 1

        if value > max_distance:
            max_actor = key
            max_distance = value

    # Yes, it prints 3631
    print("count", count)
    return max_actor, max_distance

print(furthest_kevin(adj_list))