import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import { AuthProvider, useAuth } from "./AuthContext.jsx";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";


vi.mock("@/firebase", () => ({
  auth: {},
  db: {},
}));

vi.mock("firebase/auth", async () => {
  const actual = await vi.importActual("firebase/auth");
  return {
    ...actual,
    createUserWithEmailAndPassword: vi.fn(),
    signInWithEmailAndPassword: vi.fn(),
    signOut: vi.fn(),
    updateProfile: vi.fn(),
    onAuthStateChanged: vi.fn((auth, callback) => {
      callback(null); // simulate no user
      return () => {};
    }),
  };
});

vi.mock("firebase/firestore", async () => {
  const actual = await vi.importActual("firebase/firestore");
  return {
    ...actual,
    doc: vi.fn(),
    setDoc: vi.fn(),
    getDoc: vi.fn(),
    serverTimestamp: () => "MOCK_TIMESTAMP",
  };
});

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>;

describe("AuthContext component", () => {
    beforeEach(() => {
        vi.clearAllMocks();
      
        doc.mockReturnValue("serDocRefMock");
      });

  it("should test signUp", async () => {
    const mockUser = { uid: "totoid", email: "toto@coucou.hey" };
    createUserWithEmailAndPassword.mockResolvedValue({ user: mockUser });
    updateProfile.mockResolvedValue();
    setDoc.mockResolvedValue();

    const { result } = renderHook(() => useAuth(), { wrapper });

    let response;
    await act(async () => {
      response = await result.current.signup("toto@coucou.hey", "totomdp", "totobg");
    });

    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(expect.anything(), "toto@coucou.hey", "totomdp");
    expect(updateProfile).toHaveBeenCalledWith(mockUser, { displayName: "totobg" });
    expect(setDoc).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        uid: "totoid",
        displayName: "totobg",
        email: "toto@coucou.hey",
      })
    );
    expect(response.success).toBe(true);
  });

  it("should test login", async () => {
    signInWithEmailAndPassword.mockResolvedValue();

    const { result } = renderHook(() => useAuth(), { wrapper });

    let response;
    await act(async () => {
      response = await result.current.login("toto@coucou.hey", "totomdp");
    });

    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(expect.anything(), "toto@coucou.hey", "totomdp");
    expect(response.success).toBe(true);
  });

  it("should test logout", async () => {
    signOut.mockResolvedValue();

    const { result } = renderHook(() => useAuth(), { wrapper });

    let response;
    await act(async () => {
      response = await result.current.logout();
    });

    expect(signOut).toHaveBeenCalled();
    expect(result.current.currentUser).toBe(null);
    expect(response.success).toBe(true);
  });

  it("should test the useEffect interract with fireBase", async () => {
    const mockUser = {
      uid: "totobg",
      email: "toto@coucou.hey",
    };
  
    const mockUserData = {
      displayName: "totoName",
      photoURL: "totoPhoto.jpg",
      extraField: "toto&co",
    };
  
    getDoc.mockResolvedValue({
      data: () => mockUserData,
    });
  
    onAuthStateChanged.mockImplementationOnce((_, callback) => {
      callback(mockUser);
      return () => {};
    });
  
    const { result } = renderHook(() => useAuth(), { wrapper });

    await waitFor(() => result.current.loading === false);
  
    expect(result.current.currentUser).toEqual({
      uid: "totobg",
      email: "toto@coucou.hey",
      displayName: "totoName",
      photoURL: "totoPhoto.jpg",
      extraField: "toto&co",
    });
  });

  it("should test updateUserProfile", async () => {
    const mockUser = {
      uid: "totobg",
      email: "toto@coucou.hey",
      displayName: "Old Name",
    };
  
    const updates = { displayName: "tototropbeau" };
  
    updateProfile.mockResolvedValue();
    setDoc.mockResolvedValue();
  
    // Simuler un utilisateur connecté dans Firebase Auth
    auth.currentUser = mockUser;
  
    onAuthStateChanged.mockImplementationOnce((_, callback) => {
      callback(mockUser);
      return () => {};
    });
  
    const { result } = renderHook(() => useAuth(), { wrapper });
  
    await waitFor(() => !result.current.loading);
  
    let response;
    await act(async () => {
      response = await result.current.updateUserProfile(updates);
    });
  
    expect(updateProfile).toHaveBeenCalledWith(mockUser, {
      displayName: "tototropbeau",
    });
  
    expect(setDoc).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        displayName: "tototropbeau",
      }),
      { merge: true }
    );
  
    expect(result.current.currentUser.displayName).toBe("tototropbeau");
    expect(response.success).toBe(true);
  });
  

  //----------------------------------TEST CATCH ERROR------------------------------------//

  it("should signup error ", async () => {
    createUserWithEmailAndPassword.mockRejectedValue(new Error("Signup failed"));
  
    const { result } = renderHook(() => useAuth(), { wrapper });
  
    let response;
    await act(async () => {
      response = await result.current.signup("fail@user.com", "badpassword", "failUser");
    });
  
    expect(response.success).toBe(false);
    expect(response.error).toBe("Signup failed");
  });

  it("should login error", async () => {
    signInWithEmailAndPassword.mockRejectedValue(new Error("Login failed"));
  
    const { result } = renderHook(() => useAuth(), { wrapper });
  
    let response;
    await act(async () => {
      response = await result.current.login("fail@user.com", "wrongpassword");
    });
  
    expect(response.success).toBe(false);
    expect(response.error).toBe("Login failed");
  });

  it("should handle error in logout", async () => {
    signOut.mockRejectedValue(new Error("Logout failed"));
  
    const { result } = renderHook(() => useAuth(), { wrapper });
  
    let response;
    await act(async () => {
      response = await result.current.logout();
    });
  
    expect(response.success).toBe(false);
    expect(response.error).toBe("Logout failed");
  });
  
});

