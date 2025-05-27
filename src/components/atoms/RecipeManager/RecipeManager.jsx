import { useState, useEffect } from "react";
import { useAuth } from "@context/AuthContext";
import RecipeCard from "@molecules/RecipeCard/RecipeCard";
import "./RecipeManager.scss";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "@firebase-config";

export default function RecipeManager() {
  const { currentUser } = useAuth();
  const [recipes, setRecipes] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
    ingredients: [""],
    steps: [""],
    difficulty: "facile",
    cost: "€",
  });

  // Gérer les champs standards
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Gérer les listes (ingrédients / étapes)
  const handleListChange = (field, index, value) => {
    const updated = [...form[field]];
    updated[index] = value;
    setForm({ ...form, [field]: updated });
  };

  // Ajouter un champ dans une liste
  const addToList = (field) => {
    setForm({ ...form, [field]: [...form[field], ""] });
  };

  // Réinitialiser
  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      image: "",
      ingredients: [""],
      steps: [""],
      difficulty: "facile",
      cost: "€",
    });
    setEditing(null);
  };

  // Charger les recettes utilisateur depuis Firestore
  useEffect(() => {
    const fetchRecipes = async () => {
      if (!currentUser) return;
      const q = query(
        collection(db, "recipes"),
        where("ownerId", "==", currentUser.uid)
      );
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setRecipes(data);
    };

    fetchRecipes();
  }, [currentUser]);

  // Ajouter ou modifier une recette
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) return;

    const recipeData = {
      ...form,
      ownerId: currentUser.uid,
      ownerEmail: currentUser.email,
    };

    if (editing) {
      await updateDoc(doc(db, "recipes", editing.id), recipeData);
      setRecipes((prev) =>
        prev.map((r) =>
          r.id === editing.id ? { id: editing.id, ...recipeData } : r
        )
      );
    } else {
      const docRef = await addDoc(collection(db, "recipes"), recipeData);
      setRecipes((prev) => [...prev, { id: docRef.id, ...recipeData }]);
    }

    resetForm();
  };

  // Supprimer une recette
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "recipes", id));
    setRecipes((prev) => prev.filter((r) => r.id !== id));
  };

  const handleEdit = (recipe) => {
    setForm({
      title: recipe.title,
      description: recipe.description,
      image: recipe.image,
      ingredients: recipe.ingredients,
      steps: recipe.steps,
      difficulty: recipe.difficulty,
      cost: recipe.cost,
    });
    setEditing(recipe);
  };

  return (
    <div className="recipe-manager">
      <h2>Gérer mes recettes</h2>

      <form className="recipe-form" onSubmit={handleSubmit}>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Nom de la recette"
          required
        />

        <input
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="URL de l'image"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />

        <div>
          <label>Ingrédients :</label>
          {form.ingredients.map((ing, i) => (
            <input
              key={i}
              value={ing}
              onChange={(e) =>
                handleListChange("ingredients", i, e.target.value)
              }
              placeholder={`Ingrédient ${i + 1}`}
            />
          ))}
          <button type="button" onClick={() => addToList("ingredients")}>
            + Ajouter ingrédient
          </button>
        </div>

        <div>
          <label>Étapes :</label>
          {form.steps.map((step, i) => (
            <textarea
              key={i}
              value={step}
              onChange={(e) => handleListChange("steps", i, e.target.value)}
              placeholder={`Étape ${i + 1}`}
            />
          ))}
          <button type="button" onClick={() => addToList("steps")}>
            + Ajouter étape
          </button>
        </div>

        <label>
          Difficulté :
          <select
            name="difficulty"
            value={form.difficulty}
            onChange={handleChange}
          >
            <option value="facile">Facile</option>
            <option value="moyen">Moyen</option>
            <option value="difficile">Difficile</option>
          </select>
        </label>

        <label>
          Coût :
          <select name="cost" value={form.cost} onChange={handleChange}>
            <option value="€">€</option>
            <option value="€€">€€</option>
            <option value="€€€">€€€</option>
          </select>
        </label>

        <div className="form-buttons">
          <button type="submit">{editing ? "Modifier" : "Ajouter"}</button>
          {editing && (
            <button type="button" onClick={resetForm}>
              Annuler
            </button>
          )}
        </div>
      </form>

      <hr />

      <div className="recipe-list">
        {recipes.length === 0 && <p>Aucune recette pour le moment.</p>}
        {recipes.map((r) => (
          <div key={r.id} className="recipe-wrapper">
            <RecipeCard
              title={r.title}
              image={r.image}
              description={r.description}
            />
            <p>
              <strong>Difficulté :</strong> {r.difficulty} |{" "}
              <strong>Coût :</strong> {r.cost}
            </p>
            <div>
              <button onClick={() => handleEdit(r)}>Modifier</button>
              <button onClick={() => handleDelete(r.id)}>Supprimer</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
